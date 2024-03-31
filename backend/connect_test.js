const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const User = require("./models/User")
const Travelog = require("./models/Travelog")

mongoose
  .connect("mongodb://localhost:27017/TravelogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// // 创建用户测试  err.code 11000 重复键
// User.createUser("admin1", "admin")
//   .then(() => console.log("create"))
//   .catch(err => {
//     console.log(err)
//   })

// //登录测试 返回用户document
// User.login("admin1", "admin").then(result => console.log(result))

// //创建游记测试
// Travelog.create({
//   authorId: "5f1d0c5e5e3e0c1b2c8f8c3e",
//   title: "test",
//   content: "test",
//   tags: ["test"],
//   images: ["test"],
// })
//   .then(() => console.log("create travelog"))
//   .catch(err => {
//     console.log(err)
//   })

//添加游记 通过username
const creatTravelog = async function (username, logDetail) {
  const user = await User.findOne({ username: username })
  if (user) {
    Travelog.createTravelog(user._id, logDetail)
  }
}

creatTravelog("admin1", {
  title: "test",
  content: "test",
  tags: ["test"],
  images: ["test"],
})
