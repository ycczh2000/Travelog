/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-08 21:59:48
 * @FilePath: \backend\routes\userRoutes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { avatarImgUpload } = require("../middleware/imgUpload")
const jwt = require("jsonwebtoken")
let secret = "fawgf1awi7owa35"

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  const result = await User.createUser(username, password)
  res.json(result)
})

router.post("/login", async (req, res) => {
  if (req.userId) {
    let result = await User.loginByToken(req.userId)
    res.json(result)
  } else {
    const { username, password } = req.body
    let result = await User.login(username, password)
    if (result.success) {
      const token = jwt.sign({ _id: result.data.userId }, secret, { expiresIn: "30h" })
      result.data.token = token
    }
    res.json(result)
  }
})

//头像上传
router.post("/uploadAvator", avatarImgUpload.single("image"), async (req, res) => {
  if (!req.userId) {
    return res.json({ success: false, message: "未登录" })
  }
  console.log(req.file)
  const { buffer, mimetype } = req.file
  const result = await User.uploadAvatar(req.userId, buffer, mimetype)
  res.json(result)
})

//将用户头像返回给前端
router.get("/getAvatar/:username", async (req, res) => {
  const username = req.params.username
  // console.log('将用户头像返回给前端',username)
  const result = await User.getAvatar(username)
  // console.log(result)
  if (result.success) {
    const { avatar, type } = result.data
    res.type(type)
    res.send(avatar)
  } else {
    res.status(204).end()
  }
})

// app.get("/users/:userId/following", async (req, res) => {
//   const token = req.header("Authorization")?.split(" ")[1]
//   const out = jwt.verify(token, secret)
//   const id = out._id

//   const userId = req.params?.userId
//   const result = await User.getFollowing(userId)
//   res.json(result)
// })

module.exports = router
