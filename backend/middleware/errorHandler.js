//错误捕获中间件
const multer = require("multer")
const jwt = require("jsonwebtoken")
function errorHandler(err, req, res, next) {
  console.log(err)
  if (err instanceof multer.MulterError) {
    res.status(500).json({ success: false, message: err.message })
  } else if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ success: false, message: "无效的Token" })
  } else {
    res.status(500).json({ success: false, message: "服务器内部错误" })
  }
}

module.exports = errorHandler
