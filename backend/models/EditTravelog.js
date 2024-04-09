const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const Travelog = require("./Travelog")

const editTravelogSchema = new mongoose.Schema({
  authorId: { type: ObjectId, ref: "User", required: true },
  targetTravelogId: { type: ObjectId, ref: "Travelog", default: null },

  title: { type: String, default: "" },
  content: { type: String, default: "" },
  images: { type: [String], default: [] }, //图片路径
  tags: [String],
  Location: { type: Object, default: "" }, //地点 待细化
  tripWay: { type: String, default: "" },
  tripNum: { type: String, default: "" },
  tripDate: { type: String, default: "" },
  tripBudget: { type: String, default: "" },
  isPublic: { type: Boolean, default: true },
  rate: { type: Number, default: 5 },

  createDate: { type: Date, default: Date.now },
  uploadDate: { type: Date },

  deleted: { type: Boolean, default: false }, //逻辑删除
  status: {
    type: String,
    enum: ["editing", "draft", "published"], //published:测试用
    default: "editing",
  },
})

//每个用户只有一个正在编辑的游记，状态为editing，或者存进草稿箱draft
//可以编辑已有的游记，也可以新建一个编辑状态的空游记
//编辑状态的游记可以上传图片，删除图片，保存到草稿箱，发布

//1.创建编辑状态的游记
////需要有方法更新草稿箱的游记，在创建时targetTravelogId能指向草稿箱的游记
editTravelogSchema.statics.createEditTravelog = async (userId, targetTravelogId) => {
  try {
    await EditTravelog.deleteMany({ authorId: userId, status: "editing" })
    const newEditData = {
      authorId: userId,
      targetTravelogId: targetTravelogId,
    }
    //存在targetTravelogId时，将对应的字段复制进来
    if (targetTravelogId) {
      const targetTravelog = await Travelog.findById(targetTravelogId)
      if (!targetTravelog) {
        return { success: false, message: "游记不存在", data: {} }
      } else {
        const fieldsToCopy = [
          "title",
          "content",
          "images",
          "tags",
          "Location",
          "tripWay",
          "tripNum",
          "tripDate",
          "tripBudget",
          "isPublic",
          "rate",
        ]
        fieldsToCopy.forEach(field => (newEditData[field] = targetTravelog[field]))
      }
    }
    const newEdit = new EditTravelog(newEditData)
    await newEdit.save()
    return { success: true, message: "创建成功", data: { newEdit } }
  } catch (err) {
    console.log("DB ERROR createEditTravelog:", err)
    return { success: false, message: "创建失败", data: {} }
  }
}

//2.更新的编辑游记
editTravelogSchema.statics.updataEditTravelog = async (userId, editId, editData) => {
  console.log("editData:", editData)
  try {
    delete editData.authorId
    delete editData.images //图片要单独上传
    delete editData.createDate

    const updatedEdit = await EditTravelog.findOneAndUpdate(
      { _id: editId, authorId: userId, status: "editing" },
      { $set: editData, uploadDate: Date.now() },
      { new: true }
    )
    if (!updatedEdit) {
      return { success: false, message: "游记不存在", data: {} }
    }
    return { success: true, message: "保存成功", data: updatedEdit }
  } catch (err) {
    console.log("DB ERROR updataEditTravelog:", err)
    return { success: false, message: "保存失败", data: {} }
  }
}

//3.1.发布新游记-原游记不存在 发布一个新游记并返回
editTravelogSchema.statics.publishEditTravelog = async (userId, editId) => {
  try {
    const edit = await EditTravelog.findOne({ _id: editId, authorId: userId, status: "editing" })
    if (!edit) {
      return { success: false, message: "游记不存在", data: {} }
    }
    const newTravelogData = {
      authorId: userId,
      uploadDate: Date.now(),
    }
    const fieldsToCopy = [
      "title",
      "content",
      "images",
      "tags",
      "Location",
      "tripWay",
      "tripNum",
      "tripDate",
      "tripBudget",
      "isPublic",
      "rate",
    ]
    fieldsToCopy.forEach(field => (newTravelogData[field] = edit[field]))

    const newTravelog = await Travelog.create(newTravelogData)
    await EditTravelog.deleteOne({ _id: editId, status: "editing" })
    return { success: true, message: "发布成功", data: newTravelog }
  } catch (err) {
    console.log("DB ERROR publishEditTravelog:", err)
    return { success: false, message: "发布失败", data: {} }
  }
}

//3.2.更新游记-目标原游记存在 用新游记的信息去更新targetTravelogId指向的原游记的字段，并重置发布时间和审核状态
editTravelogSchema.statics.updateExistTravelog = async (userId, editId) => {
  try {
    const edit = await EditTravelog.findOne({ _id: editId, authorId: userId, status: "editing" })
    if (!edit) {
      return { success: false, message: "游记不存在", data: {} }
    }
    const targetTravelog = await Travelog.findById(edit.targetTravelogId)
    if (!targetTravelog) {
      return { success: false, message: "要修改的游记不存在", data: {} }
    }
    const updateDatas = {}
    const fieldsToCopy = [
      "title",
      "content",
      "images",
      "tags",
      "Location",
      "tripWay",
      "tripNum",
      "tripDate",
      "tripBudget",
      "isPublic",
      "rate",
    ]
    fieldsToCopy.forEach(field => (updateDatas[field] = edit[field]))
    console.log("updateDatas", updateDatas)
    const updatedTravelog = await Travelog.findOneAndUpdate(
      { _id: edit.targetTravelogId, authorId: userId },
      { $set: updateDatas, uploadDate: Date.now(), status: "pending" },
      { new: true }
    )
    if (!updatedTravelog) {
      return { success: false, message: "更新失败", data: {} }
    } else {
      // edit.status = "published"
      await EditTravelog.deleteOne({ _id: editId, authorId: userId, status: "editing" })
      return { success: true, message: "更新成功", data: updatedTravelog }
    }
  } catch (err) {
    console.log("DB ERROR updateExistTravelog:", err)
    return { success: false, message: "更新失败", data: {} }
  }
}

//4获取图片列表 返回图片名数组，加上url前缀可得到图片的src
editTravelogSchema.statics.getImages = async userId => {
  try {
    const edit = await EditTravelog.findOne({ authorId: userId, status: "editing" })
    if (!edit) {
      return { success: true, message: "还没有图片", data: [] }
    }
    return { success: true, message: "获取成功", data: edit.images }
  } catch (err) {
    console.log("DB ERROR getImages:", err)
    return { success: false, message: "获取失败", data: [] }
  }
}

//4.上传一张图片到编辑游记 更新第i张图片路径imags[i] 返回图片名数组
editTravelogSchema.statics.uploadImage = async (userId, imgName, index) => {
  try {
    const result = await EditTravelog.findOneAndUpdate(
      { authorId: userId, status: "editing" },
      { $set: { [`images.${index}`]: imgName } },
      { new: true }
    )
    if (!result) {
      return { success: false, message: "找不到要更新的游记", data: {} }
    }
    return { success: true, message: "上传成功", data: result.images }
  } catch (err) {
    console.log("DB ERROR uploadImage:", err)
    return { success: false, message: "上传失败", data: {} }
  }
}

//5.删除第i张图片 返回图片名列表
editTravelogSchema.statics.deleteImage = async (userId, index) => {
  try {
    const travelog = await EditTravelog.findOne({ authorId: userId, status: "editing" })

    if (!travelog) {
      return { success: false, message: "找不到要更新的游记", data: {} }
    }
    console.log("travelog.images", travelog.images)
    console.log("index", index)

    // 使用数组方法删除指定索引的图片
    if (index >= 0 && index < travelog.images.length) {
      travelog.images.splice(index, 1)
    } else {
      return { success: false, message: "索引超出范围", data: {} }
    }
    const updatedTravelog = await travelog.save()

    return { success: true, message: "删除成功", data: updatedTravelog.images }
  } catch (err) {
    console.log("DB ERROR deleteImage:", err)
    return { success: false, message: "删除失败", data: {} }
  }
}

//6.查询是否有正在编辑的游记 返回editId和targetTravelogId
editTravelogSchema.statics.hasEditTravelog = async userId => {
  try {
    const edit = await EditTravelog.findOne({ authorId: userId, status: "editing" })
    if (!edit) {
      return { success: true, message: "没有正在编辑的游记", data: {} }
    }
    return {
      success: true,
      message: "存在正在编辑的游记",
      data: { editId: edit._id, targetTravelogId: edit.targetTravelogId },
    }
  } catch (err) {
    console.log("DB ERROR getEditTravelog:", err)
    return { success: false, message: "没有正在编辑的游记", data: {} }
  }
}

//7.获取正在编辑的游记 返回游记的详细信息
editTravelogSchema.statics.getEditTravelog = async userId => {
  try {
    const edit = await EditTravelog.findOne({ authorId: userId, status: "editing" })
    if (!edit) {
      return { success: false, message: "没有正在编辑的游记", data: {} }
    }
    return { success: true, message: "获取成功", data: { edit } }
  } catch (err) {
    console.log("DB ERROR getEditTravelog:", err)
    return { success: false, message: "获取失败", data: {} }
  }
}

//6.存到草稿箱 返回bool
editTravelogSchema.statics.saveDraftTravelog = async (userId, editId) => {
  try {
    const edit = await EditTravelog.findOne({ _id: editId, authorId: userId, status: "editing" })
    edit.status = "draft"
    await edit.save()
    return { success: true, message: "保存成功", data: {} }
  } catch (err) {
    console.log("DB ERROR saveDraftTravelog:", err)
    return { success: false, message: "保存失败", data: {} }
  }
}

const EditTravelog = mongoose.model("EditTravelog", editTravelogSchema)
module.exports = EditTravelog
