//fs读取multer存储的buffer

const fs = require("fs")
//获取当前路径
const sharp = require("sharp")
console.log(__dirname)
//拼接路径
const path = require("path")
const filePath = path.join(__dirname, "uploads/99963d12bccf33bbfc37016a38fa8006")

// //从二进制文件读取
fs.readFile(filePath, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    sharp(data)
      .metadata()
      .then(metadata => {
        console.log(metadata)
      })
  }
})

//从png读取
fs.readFile(path.join(__dirname, "uploads/1.png"), function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    sharp(data)
      .metadata()
      .then(metadata => {
        console.log(metadata)
      })
  }
})
