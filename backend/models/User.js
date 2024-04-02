const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ObjectId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatar: Buffer,
  avatarType: String,
  lastLoginDate: { type: Date, default: Date.now },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
})

//创建用户
userSchema.statics.createUser = async function (username, password) {
  try {
    const user = await this.findOne({ username })
    if (user) {
      return { success: false, message: "用户名已存在" }
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await this.create({ username, password: hash })
    return { success: true, message: "创建成功" }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.createUser:", err)
    return { success: false, message: "创建失败" }
  }
}

//用户名密码登录
userSchema.statics.login = async function (username, password) {
  try {
    const user = await this.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLoginDate = Date.now()
      await user.save()
      return { success: true, message: "登录成功", data: { userId: user._id, username: user.username } }
    } else {
      return { success: false, message: "用户名或密码错误" }
    }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.login:", err)
    return { success: false, message: "登陆失败" }
  }
}

//token登录
userSchema.statics.loginByToken = async function (userID) {
  try {
    const user = await this.findById(userID)
    if (user) {
      user.lastLoginDate = Date.now()
      await user.save()
      return { success: true, message: "token登录成功", data: { userId: user._id, username: user.username } }
    } else {
      return { success: false, message: "无效的token" }
    }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.loginByToken:", err)
    return { success: false, message: "登陆失败" }
  }
}

//上传头像 avatar为Buffer
userSchema.statics.uploadAvatar = async function (userId, buffer, mimetype) {
  try {
    await this.findByIdAndUpdate(userId, { avatar: buffer, avatarType: mimetype })
    return { success: true, message: "上传成功" }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.uploadAvatar:", err)
    return { success: false, message: "上传失败" }
  }
}

//获取用户头像
userSchema.statics.getAvatar = async function (username) {
  try {
    const user = await this.findOne({ username: username })
    return { success: true, data: { avatar: user.avatar, type: user.avatarType } }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.getAvatar:", err)
    return { success: false, message: `获取${username}头像失败` }
  }
}

//关注
userSchema.statics.follow = async function (username, followName) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const user = await this.find({ username: username })
    if (!user) {
      return { success: false, message: "用户不存在" }
    }
    const follow = await this.find({ username: followName })
    if (!follow) {
      return { success: false, message: "关注用户不存在" }
    }
    await this.findByIdAndUpdate(user._id, { $addToSet: { following: follow._id } })
    await this.findByIdAndUpdate(follow._id, { $addToSet: { followers: user._id } })
    await session.commitTransaction()
  } catch (err) {
    await session.abortTransaction()
    console.log("DB ERROR userSchema.statics.follow:", err)
    return { success: false, message: "关注失败" }
  } finally {
    session.endSession()
  }
}

//取消关注
userSchema.statics.unfollow = async function (username, followName) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const user = await this.findOne({ username: username })
    if (!user) {
      return { success: false, message: "用户不存在" }
    }
    const follow = await this.findOne({ username: followName })
    if (!follow) {
      return { success: false, message: "关注用户不存在" }
    }
    await this.findByIdAndUpdate(user._id, { $pull: { following: follow._id } })
    await this.findByIdAndUpdate(follow._id, { $pull: { followers: user._id } })
    await session.commitTransaction()
  } catch (err) {
    await session.abortTransaction()
    console.log("DB ERROR userSchema.statics.unfollow:", err)
    return { success: false, message: "取消关注失败" }
  } finally {
    session.endSession()
  }
}

//获取关注列表
userSchema.statics.getFollowing = async function (userId) {
  try {
    const user = await this.findById(userId).populate("following")
    return { success: true, data: user.following }
  } catch (err) {
    console.log("DB ERROR userSchema.statics.getFollowing:", err)
    return { success: false, message: "获取关注列表失败" }
  }
}

//获取粉丝列表
userSchema.statics.getFollowers = async function (userId) {
  return this.findById(userId).populate("followers")
}

const User = mongoose.model("User", userSchema)
module.exports = User
