const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const ObjectId = mongoose.Schema.Types.ObjectId
const Travelog = require("./Travelog")
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "auditor"], default: "auditor" },
  lastLoginDate: { type: Date, default: Date.now },
})

//创建用户
adminUserSchema.statics.createUser = async function (username, password, role) {
  try {
    const user = await this.findOne({ username })
    if (user) {
      return { success: false, message: "用户名已存在" }
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await this.create({ username, password: hash, role: role })
    return { success: true, message: "创建成功" }
  } catch (err) {
    console.log("DB ERROR adminUserSchema.statics.createUser:", err)
    return { success: false, message: "服务器出错，创建失败" }
  }
}

//用户名密码登录
adminUserSchema.statics.login = async function (username, password) {
  try {
    const user = await this.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLoginDate = Date.now()
      await user.save()
      return {
        success: true,
        message: "登录成功",
        data: { userId: user._id, username: user.username, role: user.role },
      }
    } else {
      return { success: false, message: "用户名或密码错误" }
    }
  } catch (err) {
    console.log("DB ERROR adminUserSchema.statics.login:", err)
    return { success: false, message: "服务器出错，登陆失败" }
  }
}

//token登录
adminUserSchema.statics.loginByToken = async function (userID) {
  try {
    const user = await this.findById(userID)
    if (user) {
      user.lastLoginDate = Date.now()
      await user.save()
      return {
        success: true,
        message: "token登录成功",
        data: { userId: user._id, username: user.username, role: user.role },
      }
    } else {
      return { success: false, message: "无效的token" }
    }
  } catch (err) {
    console.log("DB ERROR adminUserSchema.statics.loginByToken:", err)
    return { success: false, message: "服务器出错，登陆失败" }
  }
}

// 审核
adminUserSchema.statics.audit = async function (userId, travelogId, auditStatus, reason = "") {
  try {
    const travelog = await Travelog.findById(travelogId)
    if (!travelog) {
      return { success: false, message: "游记不存在" }
    }
    travelog.auditDate = Date.now()
    travelog.auditorId = userId
    switch (auditStatus) {
      case "approved":
        travelog.status = "approved"
        break
      case "rejected":
        travelog.rejectReason = reason
        travelog.status = "rejected"
      case "pending":
        travelog.status = "pending"
        break
    }

    await travelog.save()
    return { success: true, message: "成功修改审核状态" }
  } catch (err) {
    console.log("DB ERROR adminUserSchema.statics.audit:", err)
    return { success: false, message: "服务器出错，审核失败" }
  }
}

//逻辑删除
adminUserSchema.statics.delete = async function (userId, travelogId) {
  try {
    const travelog = await Travelog.findById(travelogId)
    if (!travelog) {
      return { success: false, message: "游记不存在" }
    }
    travelog.auditorId = userId
    travelog.deleted = true
    await travelog.save()
    return { success: true, message: "删除成功" }
  } catch (err) {
    console.log("DB ERROR adminUserSchema.statics.delete:", err)
    return { success: false, message: "服务器出错，删除失败" }
  }
}

const AdminUser = mongoose.model("AdminUser", adminUserSchema)
module.exports = AdminUser
