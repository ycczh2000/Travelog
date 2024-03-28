const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ObjectId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  lastLoginDate: { type: Date, default: Date.now },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
})

//创建用户
userSchema.statics.createUser = async function (username, password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return this.create({ username, password: hash })
}

//用户名密码登录
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  } else {
    return null
  }
}

//关注
userSchema.statics.follow = async function (userId, followId) {
  return this.findByIdAndUpdate(userId, { $addToSet: { following: followId } })
}

//取消关注
userSchema.statics.unfollow = async function (userId, followId) {
  return this.findByIdAndUpdate(userId, { $pull: { following: followId } })
}

//获取关注列表
userSchema.statics.getFollowing = async function (userId) {
  return this.findById(userId).populate("following")
}

//获取粉丝列表
userSchema.statics.getFollowers = async function (userId) {
  return this.findById(userId).populate("followers")
}

const User = mongoose.model("User", userSchema)
module.exports = User
