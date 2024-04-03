/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 20:31:49
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
  console.log("req.body",req.body)
  const { title, content, tripWay, tripNum, tripDate, tripBudget, city, rate } = req.body.editingData
  console.log("editingData",title, content, tripWay, tripNum, tripDate, tripBudget, city, rate)
  // const imgInfo = JSON.parse(req.body.fileList.imgInfo)
  // 访问文件列表中的每个文件对象
  // console.log(req.body.imgInfo)
  const fileList = req.body.fileList;
  const imgInfo = req.body.imgInfo;
  // fileList.forEach(file => {
  //   console.log("key:", file.key);
  //   console.log("type:", file.type);
  //   console.log("src:", file.src);
  // });

  const files = req.files
  // console.log(imgInfo.value)
  const imgInfoValue = JSON.parse(imgInfo.value); // 解析JSON字符串成JavaScript对象

  const orderedImgName = imgInfoValue.map(originalname => {
    return files.find(f => f.originalname === originalname)?.filename;
  });

  const result = await Travelog.createTravelog(userId, {
    title: title,
    content: content,
    Location: city, //地点 待细化
    tripWay: tripWay,
    tripNum: tripNum,
    tripDate: tripDate,
    tripBudget: tripBudget,
    rate: rate,
    // tags: JSON.parse(tags),
    images: orderedImgName,
    status: "approved",
  })
  console.log("successfully created a new travelog?",result)
  res.json(result)
})

module.exports = router
