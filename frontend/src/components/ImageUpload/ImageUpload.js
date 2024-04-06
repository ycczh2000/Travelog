/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 19:32:40
 * @FilePath: \Travelog\frontend\src\components\ImageUpload\ImageUpload.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { ImageUploader, Toast } from "antd-mobile"
import "./ImageUpload.css"
import { $uploadImage, $getImageList, $deleteImage } from "../../api/travelogApi.js"

const ImageUpload = forwardRef((props, ref) => {
  const maxCount = 9
  const [fileList, setFileList] = useState([
    // {
    //   url: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
    // },
  ])

  //重新加载图片url列表，并在fileList数组中附上index，供删除，更新方法使用
  async function reloadImages() {
    const result = await $getImageList()
    console.log("result", result)
    //图片名称数组
    const imageNames = result.data
    console.log("imageNames", imageNames)
    if (imageNames) {
      const newfileList = imageNames.map((url, index) => {
        return {
          url: "http://localhost:8000/images/" + url,
          index: index,
        }
      })
      setFileList(newfileList)
      console.log("newfileList", newfileList)
    }
  }
  useEffect(() => {
    reloadImages()
  }, [])

  //上传最后一张图片，更新第i张需要另写方法
  async function mockUpload2(file) {
    const index = fileList.length
    const result = await $uploadImage({ image: file, index: index })
    if (result.success) {
      return {
        url: "http://localhost:8000/images/" + result.data[index],
        index: index,
      }
    }
  }

  const handleChange = function (items) {
    reloadImages()
  }
  //删除第i张图片
  const handleDelete = async function (ImageUploadItem) {
    const result = await $deleteImage({ index: ImageUploadItem.index })
    console.log("delete result", result)
  }
  //####结束新增方法

  useImperativeHandle(ref, () => ({
    getFileList() {
      return fileList
    },
  }))

  async function fetchImages(urls) {
    const imagePromises = urls.map(async file => {
      const response = await fetch(file.url)
      const blob = await response.blob()
      const fileName = file.url.substring(file.url.lastIndexOf("/") + 1) // 从 URL 中提取文件名
      const imageFile = new File([blob], fileName, { type: blob.type })
      return imageFile
    })
    return Promise.all(imagePromises)
  }

  return (
    <ImageUploader
      columns={4}
      upload={mockUpload2}
      style={{ "--cell-size": "150px", display: "inline-block" }}
      value={fileList}
      onChange={handleChange}
      onPreview={async (file, index) => {
        console.log("file", file)
        console.log("index", index)
      }}
      onDelete={handleDelete}
      multiple={true}
      maxCount={maxCount}
      showUpload={fileList.length < maxCount}
      onCountExceed={exceed => {
        Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
      }}
    />
  )
})

export default ImageUpload
