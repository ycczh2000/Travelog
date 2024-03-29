const express = require("express")
const cors = require("cors")
const User = require("./models/User")
const Travelog = require("./models/Travelog")
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/TravelogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  User.createUser(username, password)
    .then(() => res.json({ success: true, message: "注册成功" }))
    .catch(err => {
      if (err.code === 11000) {
        res.json({ success: false, message: "用户名已存在" })
      } else {
        res.json({ success: false, message: err.message })
      }
    })
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  User.login(username, password)
    .then(user => {
      if (user) {
        res.json({ success: true, message: "登录成功" })
      } else {
        res.json({ success: false, message: "用户名或密码错误" })
      }
    })
    .catch(err => res.json({ success: false, message: err.message }))
})

port = 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
