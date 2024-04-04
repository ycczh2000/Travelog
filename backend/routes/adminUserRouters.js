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
  console.log("req.query", req.query)
  const { title, auditorUsername, authorUsername } = req.query
  console.log(title, auditorUsername, authorUsername)
  const query = {}
  const authorQuery = {}
  const auditorQuery = {}

  if (auditorUsername) {
    auditorQuery["auditorInfo.username"] = auditorUsername
  }
  if (authorUsername) {
    authorQuery["authorInfo.username"] = authorUsername
  }
  if (title) {
    const titleReg = new RegExp(title)
    query.title = { $regex: titleReg }
  }
  console.log("query", query)
  const result = await Travelog.aggregate([
    //管理员过滤
    {
      $lookup: {
        from: "adminusers",
        localField: "auditorId",
        foreignField: "_id",
        as: "auditorInfo",
      },
    },
    {
      $unwind: { path: "$auditorInfo", preserveNullAndEmptyArrays: true }, // 设置为true，否则auditorInfo为空时，不会返回数据
    },
    {
      $match: auditorQuery,
    },
    //用户过滤
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorInfo",
      },
    },
    {
      $unwind: { path: "$authorInfo", preserveNullAndEmptyArrays: true },
    },
    { $match: authorQuery },
    //游记内容过滤
    {
      $match: query,
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        tags: 1,
        images: 1,
        status: 1,
        auditDate: 1,
        createDate: 1,
        authorUsername: "$authorInfo.username",
        auditorUsername: "$auditorInfo.username",
      },
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
