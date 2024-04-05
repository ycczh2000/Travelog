const fs = require("fs")
const path = require("path")
const multer = require("multer")
const mongoose = require("mongoose")
//Multer中间件，用于处理上传的图片文件数据

//直接存到磁盘，uploads文件夹 这里只能写同步代码
const imgStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = path.join(__dirname, "../uploads")
    fs.access(destinationPath, fs.constants.W_OK, err => {
      if (err) {
        console.error("ERROR multer.diskStorage 无法写入到指定目录 ", err)
        callback(err, "")
      } else {
        callback(null, destinationPath)
      }
    })
  },
  filename: async function (req, file, callback) {
    const objectId = new mongoose.Types.ObjectId()
    const fileName = objectId.toHexString()
    const extension = path.extname(file.originalname)
    callback(null, `${fileName}${extension}`)
  },
})
const imgUpload = multer({ storage: imgStorage })

//放进内存，之后以buffer的形式存到用户document中
const avatarMemoryStorage = multer.memoryStorage()
const avatarImgUpload = multer({ storage: avatarMemoryStorage })

const travelogMemoryStorage = multer.memoryStorage()
const travelogImgUpload = multer({ storage: travelogMemoryStorage })

module.exports = { imgUpload, avatarImgUpload, travelogImgUpload }
