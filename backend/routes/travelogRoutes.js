/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 20:52:26
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

//获取某篇游记
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

//游记上传v1 待优化
router.post("/travelogs", imgUpload.array("image"), async (req, res, next) => {
  const userId = req.userId

  const { title, content, tags } = req.body
  const imgInfo = JSON.parse(req.body.imgInfo)
  const files = req.files
  const imgInfoValue = JSON.parse(imgInfo.value)
  const orderedImgName = imgInfoValue.map(originalname => {
    return files.find(f => f.originalname === originalname)?.filename
  })

  const result = await Travelog.createTravelog(userId, {
    title: title || "这是一个标题",
    content: content || "\u200B",
    Location: city || "\u200B", // 地点，todo
    tripWay: tripWay || "\u200B",
    tripNum: tripNum || "\u200B",
    tripDate: tripDate || "\u200B",
    tripBudget: tripBudget || "\u200B",
    rate: rate || 5,
    // tags: JSON.parse(tags),
    images: orderedImgName,
    status: "approved",
  })
  console.log("successfully created a new travelog?", result)
  res.json(result)
})

//游记上传v2 逐张上传
//1.创建编辑状态的游记
router.post("/travelogs/edit", async (req, res) => {
  const targetTravelogId = req.body.targetTravelogId || null
  console.log("targetTravelogId", targetTravelogId)
  const userId = req.userId
  const result = await EditTravelog.createEditTravelog(userId, targetTravelogId)
  res.json(result)
})

//2.更新当前编辑的游记
router.put("/travelogs/edit", async (req, res) => {
  const userId = req.userId
  const editId = req.body.editId
  const editData = req.body.editData
  const result = await EditTravelog.updataEditTravelog(userId, editId, editData)
  res.json(result)
})

//3.1 发布新游记-不存在原游记
router.post("/travelogs/edit/publish", async (req, res) => {
  const userId = req.userId
  const editId = req.body.editId
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

//4.上传或更新图片
//存储到某个目录./uploads下 返回值为文件名
router.post("/travelogs/edit/uploadimg", travelogImgUpload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "没有图片上传" })
  }
  const userId = req.userId
  const { editId, index } = req.body
  const fileName = new mongoose.Types.ObjectId().toString()
  const fileExtension = path.extname(req.file.originalname)
  const imgName = `${fileName}${fileExtension}`
  // console.log("req.file", imgName)
  const filePath = path.join(__dirname, "../uploads", imgName)
  try {
    fs.writeFileSync(filePath, req.file.buffer)
    const result = await EditTravelog.uploadImage(userId, editId, imgName, index)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: "保存失败" })
  }
})

//5.删除第i张图片
router.delete("/travelogs/edit/deleteimg", async (req, res) => {
  const userId = req.userId
  const { editId, index } = req.body
  const result = await EditTravelog.deleteImage(userId, editId, index)
  res.json(result)
})

//6.存到草稿箱
router.put("/travelogs/edit/savedraft", async (req, res) => {
  const userId = req.userId
  const { editId } = req.body
  const result = await EditTravelog.saveDraftTravelog(userId, editId)
  res.json(result)
})

module.exports = router
