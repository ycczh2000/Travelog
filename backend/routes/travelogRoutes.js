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
  console.log("req.body", req.body)
  const { title, content, tripWay, tripNum, tripDate, tripBudget, city, rate } = req.body.editingData
  console.log("editingData", title, content, tripWay, tripNum, tripDate, tripBudget, city, rate)
  // 访问文件列表中的每个文件对象
  // console.log(req.body.imgInfo)
  const imgInfo = req.body.imgInfo
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

module.exports = router
