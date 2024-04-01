const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  const result = await User.createUser(username, password)
  res.json(result)
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const result = await User.login(username, password)
  res.json(result)
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
