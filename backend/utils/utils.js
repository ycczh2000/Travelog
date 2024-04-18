const fs = require("fs")
const path = require("path")

function deleteFileAsync(filename) {
  return new Promise(resolve => {
    console.log()
    const filePath = path.join(__dirname, "../uploads", filename)
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`删除图片 ${filename} 出错:`, err)
        resolve() // 即使出错也解析promise
      } else {
        console.log(`成功删除图片 ${filename}.`)
        resolve()
      }
    })
  })
}

function deleteMultipleFiles(filenames) {
  const deletePromises = filenames.map(filename => deleteFileAsync(filename))
  console.log(filenames)
  return Promise.all(deletePromises)
    .then(() => {
      console.log(`成功删除图片列表${filenames}`)
    })
    .catch(error => {
      console.error(`删除图片列表失败${filenames}:`, error)
    })
}

module.exports = { deleteFileAsync, deleteMultipleFiles }
