const fs = require("fs")
const path = require("path")
const multer = require("multer")
const mongoose = require("mongoose")

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

const avatarMemoryStorage = multer.memoryStorage()
const avatarImgUpload = multer({ storage: avatarMemoryStorage })

module.exports = { imgUpload, avatarImgUpload }
