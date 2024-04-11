const multer = require("multer")
const jwt = require("jsonwebtoken")

//错误捕获中间件
function errorHandler(err, req, res, next) {
  console.log(err)
  if (err instanceof multer.MulterError) {
    res.status(500).json({ success: false, message: err.message })
  } else if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ success: false, message: "登录状态过期，请重新登录" })
  } else {
    res.status(500).json({ success: false, message: "服务器内部错误" })
  }
}

module.exports = errorHandler
