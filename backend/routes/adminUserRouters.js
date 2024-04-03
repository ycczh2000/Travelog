const express = require("express")
const router = express.Router()
const AdminUser = require("../models/AdminUser")
const jwt = require("jsonwebtoken")
const Travelog = require("../models/Travelog")
const User = require("../models/User")
let secret = "fawgf1awi7owa35"

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body
  const result = await AdminUser.createUser(username, password, role)
  res.json(result)
})

router.post("/login", async (req, res) => {
  if (req.userId) {
    let result = await User.loginByToken(req.userId)
    res.json(result)
  } else {
    const { username, password, role } = req.body
    console.log(req.body)
    let result = await AdminUser.login(username, password, role)
    if (result.success) {
      const admintoken = jwt.sign({ _id: result.data.userId, role: role }, secret, { expiresIn: "30h" })
      result.data.admintoken = admintoken
    }
    res.json(result)
  }
})

router.delete("/travelogs/:id", async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).send("无权限")
  }
  const travelogId = req.params.id
  AdminUser.delete(req.userId, travelogId)
  res.json(result)
})

router.put("/travelogs/:id", async (req, res) => {
  const { auditStatus } = req.body
  const result = AdminUser.audit(req.userId, req.params.id, auditStatus)
  res.json(result)
})

//查询query
router.get("/travelogs", async (req, res) => {
  console.log("/travelogs/")
  // const result = await Travelog.find()
  const result = await Travelog.aggregate([
    {
      $lookup: {
        from: "users",
        let: { authorId: "$authorId" },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$authorId"] } } }, { $project: { username: 1, _id: 0 } }],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
  ])

  res.json(result)
})

router.get("/travelogs/:id", async (req, res) => {
  console.log("/travelogs/:id")
  const result = await Travelog.findById(req.params.id)
  if (!result) {
    return res.status(404).send("游记不存在")
  } else {
    res.json({ success: true, ...result })
  }
})

module.exports = router
