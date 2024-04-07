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
    let result = await AdminUser.loginByToken(req.userId)
    res.json(result)
  } else {
    const { username, password } = req.body
    console.log(req.body)
    let result = await AdminUser.login(username, password)
    if (result.success) {
      const admintoken = jwt.sign({ _id: result.data.userId, role: result.data.role }, secret, { expiresIn: "30h" })
      result.data.admintoken = admintoken
    }
    res.json(result)
  }
})

router.delete("/travelogs/:id", async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).send("无权限")
  }
  console.log("delete travelog")
  console.log(req.params)
  const travelogId = req.params.id
  const result = await AdminUser.delete(req.userId, travelogId)
  res.json(result)
})

router.put("/travelogs/:id", async (req, res) => {
  if (!req.userId) {
    return res.status(401).send("未登录")
  }
  const { auditStatus, reason } = req.body
  console.log("auditStatus", auditStatus)
  console.log(reason)
  const result = await AdminUser.audit(req.userId, req.params.id, auditStatus, reason)
  res.json(result)
})

const adminFields = {
  _id: 1,
  title: 1,
  createDate: 1,
  status: 1,
  authorUsername: 1,
  auditorUsername: 1,
}

const auditorFields = {
  _id: 1,
  title: 1,
  createDate: 1,
  status: 1,
}

//查询游记   title 作者 authorUsername  审核人 auditorUsername
router.get("/travelogs", async (req, res) => {
  if (!req.userId) {
    return res.status(401).send("未登录")
  }
  const projectFields = req.role === "admin" ? adminFields : auditorFields
  const { title, auditorUsername, authorUsername, status } = req.query

  const query = { deleted: false }
  if (authorUsername && req.role === "admin") {
    const author = await User.findOne({ username: authorUsername }, "_id")
    if (!author) {
      return res.json([])
    }
    query.authorId = author._id
  }

  if (auditorUsername && req.role === "admin") {
    const auditor = await AdminUser.findOne({ username: auditorUsername }, "_id")
    if (!auditor) {
      return res.json([])
    }
    query.auditorId = auditor._id
  }

  if (title) {
    const titleReg = new RegExp(title)
    query.title = { $regex: titleReg }
  }
  if (status) {
    query.status = status
  }

  console.log("query", query)
  const result = await Travelog.aggregate([
    {
      $match: query,
    },
    //填充作者username
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorInfo", //
      },
    },
    {
      $unwind: "$authorInfo",
    },
    {
      $addFields: {
        authorUsername: "$authorInfo.username",
      },
    },
    //填充审核人username
    {
      $lookup: {
        from: "adminusers",
        localField: "auditorId",
        foreignField: "_id",
        as: "auditorInfo",
      },
    },
    {
      $unwind: { path: "$auditorInfo", preserveNullAndEmptyArrays: true }, // 设置为true，否则auditorInfo为空时不会返回数据
    },
    {
      $addFields: {
        auditorUsername: "$auditorInfo.username",
      },
    },
    {
      $project: projectFields,
    },
    {
      $sort: { createDate: -1 },
    },
  ])

  res.json(result)
})

router.get("/travelogs/:id", async (req, res) => {
  if (!req.userId) {
    return res.status(401).send("未登录")
  }
  console.log("/travelogs/:id")
  const result = await Travelog.findById(req.params.id).catch(err => {
    res.status(404).send("游记不存在")
  })
  if (!result) {
    return res.status(404).send("游记不存在")
  } else {
    res.json({ success: true, data: result })
  }
})

module.exports = router
