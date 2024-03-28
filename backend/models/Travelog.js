const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const travelogSchema = new mongoose.Schema({
  authorId: { type: ObjectId, ref: "User", required: true },
  createDate: { type: Date, default: Date.now },
  tags: [String],
  images: [String],
  title: { type: String, required: true },
  content: { type: String, required: true },
  deleted: { type: Boolean, default: false }, //逻辑删除
  audit: { type: Number, default: 0 }, //0:未审核 1:审核通过 -1:审核未通过
  auditDate: { type: Date },
  Location: { type: String, default: "" }, //地点 待细化

  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },

  //较难实现的功能
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      authorId: { type: ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
      star: { type: Number, default: 0 },
    },
  ],
})

//创建游记
travelogSchema.statics.createTravelog = async function (authorId, log) {
  return this.create({ authorId, ...log })
}

const Travelog = mongoose.model("Travelog", travelogSchema)
module.exports = Travelog
