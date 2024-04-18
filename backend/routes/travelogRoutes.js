const express = require("express")
const router = express.Router()
const Travelog = require("../models/Travelog")
const EditTravelog = require("../models/EditTravelog")
const { imgUpload, travelogImgUpload } = require("../middleware/imgUpload")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const User = require("../models/User")
const ObjectId = mongoose.Types.ObjectId
const { deleteFileAsync } = require("../utils/utils")
//与游记相关的接口

//###################游记上传相关###################
//游记上传v2 逐张上传
//1.创建新游记 创建一个状态为editing的新编辑游记
router.post("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const targetTravelogId = null
  console.log("targetTravelogId", targetTravelogId)
  const result = await EditTravelog.createEditTravelog(userId, targetTravelogId)
  res.json(result)
})

//1.2 编辑游记 创建一个状态为updating，通过targetTravelogId指向某个已发布游记的编辑游记
router.post("/travelogs/updating", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const { targetTravelogId } = req.body
  console.log("targetTravelogId", targetTravelogId)
  const result = await EditTravelog.createUpdateTravelog(userId, targetTravelogId)
  res.json(result)
})

//2.更新当前编辑的游记 只接受对文本的更新
router.put("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  console.log(req.body)
  const { editId, editData, status } = req.body
  console.log("editId", editId, "userId", userId, "status", status)
  const result = await EditTravelog.updataEditTravelog(userId, editId, editData, status)
  res.json(result)
})

//3.1 发布新游记 - 不存在原游记
router.post("/travelogs/edit/publish", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const editId = req.body.editId
  console.log("editId", editId)
  const result = await EditTravelog.publishEditTravelog(userId, editId)
  res.json(result)
})

//3.2 更新游记 - 原游记存在 实现删除图片
router.put("/travelogs/edit/update", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const editId = req.body.editId
  const result = await EditTravelog.updateExistTravelog(userId, editId)
  res.json(result)
})

//4.0 获取图片列表 data: ["image1.png", "image2.jpg", ...] status为editing或updating
router.get("/travelogs/edit/images/:editId", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const { editId } = req.params
  const result = await EditTravelog.getImages(userId, editId)
  res.json(result)
})

//4.上传或更新第i张图片
//存储到某个目录./uploads下 返回值为新的文件名
router.post("/travelogs/edit/uploadimg", travelogImgUpload.single("image"), async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  if (!req.file) {
    return res.status(400).json({ message: "没有图片上传" })
  }
  const { index, status, editId } = req.body
  const fileExtension = path.extname(req.file.originalname)
  const imageId = new ObjectId()
  const imgName = `${imageId}${fileExtension}`
  const filePath = path.join(__dirname, "../uploads", imgName)
  try {
    fs.writeFileSync(filePath, req.file.buffer)
    const result = await EditTravelog.uploadImage(userId, imgName, index, status, editId)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: "保存失败" })
  }
})

//5.删除第i张图片 磁盘删除写在model方法中
router.delete("/travelogs/edit/deleteimg", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const { index, status, editId } = req.query
  console.log("req.params", index)
  const result = await EditTravelog.deleteImage(userId, index, status, editId)
  res.json(result)
})

//6.查询是否有正在编辑的游记 返回editId和targetTravelogId
router.get("/travelogs/editid/:status", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const status = req.params?.status //edit或updating
  console.log("/travelogs/editid/:status", req.params)
  const result = await EditTravelog.hasEditTravelog(userId, status)
  res.json(result)
})

//7.获取正在编辑的游记 返回详细信息
router.get("/travelogs/edit/:status", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const status = req.params?.status //edit或updating
  const result = await EditTravelog.getEditTravelog(userId, status)
  res.json(result)
})

//###################游记查询相关#####################
//1.查询所有游记
router.get("/travelogs", async (req, res) => {
  console.log("/travelogs", req.query)
  const { title, tripBudget, tripNum, tripWay, tripDate, username } = req.query
  const query = {}

  if (username) {
    const author = await User.findOne({ username: username }, "_id")
    if (!author) {
      return res.json([])
    }
    query.authorId = author._id
  }
  console.log("query", query)

  if (title) {
    const titleReg = new RegExp(title)
    query.title = { $regex: titleReg }
  }
  if (tripBudget) {
    query.tripBudget = tripBudget
  }
  if (tripNum) {
    query.tripNum = tripNum
  }
  if (tripWay) {
    query.tripWay = tripWay
  }
  if (tripDate) {
    query.tripDate = tripDate
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

//通过id获取我的某篇游记
router.get("/mytravelogs/:id", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const id = req.params?.id
  const result = await EditTravelog.saveDraftTravelog(userId, id)
  res.json(result)
})

//获取某篇游记 这个api只能获取到审核通过、已发布、公开的游记 要放到/travelogs/edit路由下面
router.get("/travelogs/:id", async (req, res) => {
  const id = req.params?.id
  const result = await Travelog.getTravelogById(id)
  res.json(result)
  console.log("/travelogs/:id", result)
})

//获取某个其它用户的所有游记
router.get("/users/:username/travelogs", async (req, res) => {
  const username = req.params?.username
  const result = await Travelog.getTravelogsByUsername(username)
  res.json(result)
})

//获取我的游记列表
router.get("/mytravelogs", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const result = await Travelog.getMyTravelogs(userId)
  res.json(result)
})

//删除游记
router.delete("/travelogs/:id", async (req, res) => {
  const userId = req.userId
  if (!userId) {
    return res.status(401).send("未登录")
  }
  const travelogId = req.params?.id
  const result = await Travelog.deleteTravelog(userId, travelogId)
  await EditTravelog.deleteEditTravelog(userId, travelogId)
  res.json(result)
})

module.exports = router
