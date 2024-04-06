/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 23:42:06
 * @FilePath: \backend\routes\travelogRoutes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express")
const router = express.Router()
const Travelog = require("../models/Travelog")
const EditTravelog = require("../models/EditTravelog")
const { imgUpload, travelogImgUpload } = require("../middleware/imgUpload")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

//游记上传v1 废弃
// router.post("/travelogs", imgUpload.array("image"), async (req, res, next) => {
//   const userId = req.userId

//   const { title, content, tags } = req.body
//   const imgInfo = JSON.parse(req.body.imgInfo)
//   const files = req.files
//   const imgInfoValue = JSON.parse(imgInfo.value)
//   const orderedImgName = imgInfoValue.map(originalname => {
//     return files.find(f => f.originalname === originalname)?.filename
//   })

//   const result = await Travelog.createTravelog(userId, {
//     title: title || "这是一个标题",
//     content: content || "\u200B",
//     Location: city || [], // 地点，todo
//     tripWay: tripWay || "\u200B",
//     tripNum: tripNum || "\u200B",
//     tripDate: tripDate || "\u200B",
//     tripBudget: tripBudget || "\u200B",
//     rate: rate || 5,
//     // tags: JSON.parse(tags),
//     images: orderedImgName,
//     status: "approved",
//   })
//   console.log("successfully created a new travelog?", result)
//   res.json(result)
// })
//###################游记上传相关###################
//游记上传v2 逐张上传
//1.创建编辑状态的游记 userId->editId
router.post("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  const targetTravelogId = req.body.targetTravelogId || null
  console.log("targetTravelogId", targetTravelogId)
  const result = await EditTravelog.createEditTravelog(userId, targetTravelogId)
  res.json(result)
})

//2.更新当前编辑的游记
router.put("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  console.log(req.body)
  const { editId, editData } = req.body
  console.log("editId", editId, "userId", userId)
  const result = await EditTravelog.updataEditTravelog(userId, editId, editData)
  res.json(result)
})

//3.1 发布新游记-不存在原游记
router.post("/travelogs/edit/publish", async (req, res) => {
  const userId = req.userId
  const editId = req.body.editId
  console.log("editId", editId)
  const result = await EditTravelog.publishEditTravelog(userId, editId)
  res.json(result)
})

//3.2 更新游记-原游记存在
router.put("/travelogs/edit/update", async (req, res) => {
  const userId = req.userId
  const editId = req.body.editId
  const result = await EditTravelog.updateEditTravelog(userId, editId)
  res.json(result)
})

//4.0 获取图片列表 data: ["image1.png", "image2.jpg", ...]
router.get("/travelogs/edit/images", async (req, res) => {
  const userId = req.userId
  const result = await EditTravelog.getImages(userId)
  res.json(result)
})

//4.上传或更新第i张图片
//存储到某个目录./uploads下 返回值为文件名
router.post("/travelogs/edit/uploadimg", travelogImgUpload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "没有图片上传" })
  }
  const userId = req.userId
  const { index } = req.body
  const fileName = new mongoose.Types.ObjectId().toString()
  const fileExtension = path.extname(req.file.originalname)
  const imgName = `${fileName}${fileExtension}`
  // console.log("req.file", imgName)
  const filePath = path.join(__dirname, "../uploads", imgName)
  try {
    fs.writeFileSync(filePath, req.file.buffer)
    const result = await EditTravelog.uploadImage(userId, imgName, index)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: "保存失败" })
  }
})

//5.删除第i张图片
router.delete("/travelogs/edit/deleteimg", async (req, res) => {
  const userId = req.userId
  const { index } = req.query
  console.log("req.params", index)
  const result = await EditTravelog.deleteImage(userId, index)
  res.json(result)
})

//6.查询是否有正在编辑的游记 返回值为id
router.get("/travelogs/editid", async (req, res) => {
  const userId = req.userId
  const result = await EditTravelog.hasEditTravelog(userId)
  res.json(result)
})

//7.获取正在编辑的游记
router.get("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  const result = await EditTravelog.getEditTravelog(userId)
  res.json(result)
})

//8.存到草稿箱
router.put("/travelogs/edit/savedraft", async (req, res) => {
  const userId = req.userId
  const { editId } = req.body
  const result = await EditTravelog.saveDraftTravelog(userId, editId)
  res.json(result)
})

//###################获取游记相关#####################
//1.查询所有游记
router.get("/travelogs", async (req, res) => {
  const { title } = req.query
  const query = {}
  if (title) {
    const titleReg = new RegExp(title)
    query.title = { $regex: titleReg }
  }
  query.deleted = false
  query.status = "approved"
  console.log("req.query", req.query)

  const result = await Travelog.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "users",
        let: { authorId: "$authorId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$authorId"] } } }, //匹配users集合的_id和travelogs的authorId}}
          { $project: { username: 1, _id: 0 } },
        ],
        as: "user_info", //user_info -> user_info.username
      },
    },
    { $unwind: "$user_info" },
    {
      $addFields: {
        username: "$user_info.username",
        likesCount: { $size: "$likes" },
        image: { $arrayElemAt: ["$images", 0] },
        images: { $slice: ["$images", 3] },
      },
    },
    // // 添加分页 分页参数
    // { $skip: skip },
    // { $limit: parseInt(pageSize) },
    {
      $project: {
        id: "$_id",
        _id: 0,
        username: 1,
        avatar: 1, //需要url路径
        title: 1,
        images: 1,
        image: 1,
        // likes:0,
        likesCount: 1,
        rate: 1,
        title: 1,
        tripBudget: 1,
        tripNum: 1,
        tripWay: 1,
        tripDate: 1,
        Location: 1,
      },
    },
  ])
  res.json(result)
})

//获取某篇游记 要放到/travelogs/edit下面
router.get("/travelogs/:id", async (req, res) => {
  const id = req.params?.id
  const result = await Travelog.getTravelogById(id)
  res.json(result)
})

//获取某个用户的所有游记
router.get("/users/:username/travelogs", async (req, res) => {
  const username = req.params?.username
  const result = await Travelog.getTravelogsByUsername(username)
  res.json(result)
})

//获取我的游记列表
router.get("/mytravelogs", async (req, res) => {
  const userId = req.userId
  const result = await Travelog.getMyTravelogs(userId)
  res.json(result)
})

module.exports = router
