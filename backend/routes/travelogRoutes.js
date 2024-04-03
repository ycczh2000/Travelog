const express = require("express")
const router = express.Router()
const Travelog = require("../models/Travelog")
const { imgUpload } = require("../middleware/imgUpload")

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

//游记上传 待优化
router.post("/travelogs", imgUpload.array("image"), async (req, res, next) => {
  const userId = req.userId

  const { title, content, tags } = req.body
  const imgInfo = JSON.parse(req.body.imgInfo)
  const files = req.files
  const orderedImgName = imgInfo.order.map(originalname => {
    return files.find(f => f.originalname === originalname)?.filename
  })
  const result = await Travelog.createTravelog(userId, {
    title: title,
    content: content,
    tags: JSON.parse(tags),
    images: orderedImgName,
    status: "approved",
  })
  res.json(result)
})

module.exports = router
