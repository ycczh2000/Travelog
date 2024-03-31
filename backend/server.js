const fs = require("fs")
const path = require("path")

const express = require("express")
require("express-async-errors") //自动捕获异步错误
const cors = require("cors")
const multer = require("multer")
const jwt = require("jsonwebtoken")
secret = "fawgf1awi7owa35"

const mongoose = require("mongoose")
const User = require("./models/User")
const Travelog = require("./models/Travelog")

mongoose
  .connect("mongodb://localhost:27017/TravelogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())

const token = jwt.sign({ _id: "66062bf0537e9aa870110177" }, secret, { expiresIn: "30h" })
const out = jwt.verify(token, secret)
console.log("测试用token与out")
console.log("token:  ", token)
console.log("out:  ", out)

const imgStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = path.join(__dirname, "uploads")
    fs.access(destinationPath, fs.constants.W_OK, err => {
      if (err) {
        console.error("ERROR multer.diskStorage 无法写入到指定目录 ", err)
        callback(err, "")
      } else {
        callback(null, destinationPath)
      }
    })
  },
  filename: async function (req, file, callback) {
    const objectId = new mongoose.Types.ObjectId()
    const fileName = objectId.toHexString()
    const extension = path.extname(file.originalname)
    callback(null, `${fileName}${extension}`)
  },
})
const imgUpload = multer({ storage: imgStorage })

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  const result = await User.createUser(username, password)
  res.json(result)
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const result = await User.login(username, password)
  res.json(result)
})

//获取某篇游记
app.get("/travelogs/:id", async (req, res) => {
  const id = req.params?.id
  console.log("id", id)
  const result = await Travelog.getTravelogById(id)
  res.json(result)
})

//获取某个用户的所有游记
app.get("/users/:username/travelogs", async (req, res) => {
  const username = req.params?.username
  const result = await Travelog.getTravelogsByUsername(username)
  res.json(result)
})

app.get("/users/:userId/following", async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1]
  const out = jwt.verify(token, secret)
  const id = out._id

  const userId = req.params?.userId
  const result = await User.getFollowing(userId)
  res.json(result)
})

//获取我的游记列表
app.get("/mytravelogs", async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1]
  const out = jwt.verify(token, secret)
  const id = out._id

  const result = await Travelog.getMyTravelogs(id)
  res.json(result)
})

//游记上传 待优化
app.post("/travelogs", imgUpload.array("image"), async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  const out = jwt.verify(token, secret)
  const id = out._id

  const { title, content, tags } = req.body
  const imgInfo = JSON.parse(req.body.imgInfo)
  const files = req.files
  const orderedImgName = imgInfo.order.map(originalname => {
    return files.find(f => f.originalname === originalname)?.filename
  })
  const result = await Travelog.createTravelog(id, {
    title: title,
    content: content,
    tags: JSON.parse(tags),
    images: orderedImgName,
  })
  res.json(result)
})

// 图片服务 通过url直接访问图片
app.use("/images", express.static(path.join(__dirname, "uploads")))

//错误捕获中间件
app.use((err, req, res, next) => {
  console.log(err)
  if (err instanceof multer.MulterError) {
    res.status(500).json({ success: false, message: err.message })
  } else if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ success: false, message: "无效的Token" })
  } else {
    res.status(500).json({ success: false, message: "服务器内部错误" })
  }
})

port = 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
