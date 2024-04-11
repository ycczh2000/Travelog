const fs = require("fs")
const path = require("path")
const multer = require("multer")
const mongoose = require("mongoose")
//Multer中间件，用于处理上传的表单数据

//放进内存，之后以buffer的形式存到用户document中
const avatarMemoryStorage = multer.memoryStorage()
const avatarImgUpload = multer({ storage: avatarMemoryStorage })

const travelogMemoryStorage = multer.memoryStorage()
const travelogImgUpload = multer({ storage: travelogMemoryStorage })

module.exports = { avatarImgUpload, travelogImgUpload }
