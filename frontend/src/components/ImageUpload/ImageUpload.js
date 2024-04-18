import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react"
import { ImageUploader, Toast, ImageViewer } from "antd-mobile"
import { $uploadImage, $getImageList, $deleteImage } from "../../api/travelogApi.js"
import styles from "./ImageUpload.module.scss"
import { baseURL } from "../../config/config.js"
//应该当父元素publish确认登录状态后再请求图片列表
const ImageUpload = forwardRef((props, ref) => {
  const maxCount = 9
  const [fileList, setFileList] = useState([])
  const { editId, status } = props
  const [imageViewerVisible, setImageViewerVisible] = useState(false)
  const [imageViewerData, setImageViewerData] = useState({ image: "", index: 0 })
  //重新加载图片url列表，并在fileList数组中附上index，供删除，更新方法使用
  async function reloadImages() {
    const result = await $getImageList(editId)
    console.log("result", result)
    //图片名称数组
    const imageNames = result.data
    console.log("imageNames", imageNames)
    if (imageNames) {
      const newfileList = imageNames.map((url, index) => {
        return {
          url: `${baseURL}images/` + url,
          index: index,
        }
      })
      setFileList(newfileList)
      console.log("newfileList", newfileList)
    }
  }

  useEffect(() => {
    if (editId && editId !== "") {
      reloadImages()
    }
  }, [editId])

  //上传最后一张图片，更新第i张需要另写方法
  async function mockUpload2(file) {
    const index = fileList.length
    const result = await $uploadImage({ image: file, index: index, status: status, editId })
    if (result.success) {
      return {
        url: `${baseURL}images/` + result.data[index],
        index: index,
      }
    }
  }

  //重新获取图片列表，并加载
  const handleChange = function (items) {
    reloadImages()
  }
  //删除第i张图片
  const handleDelete = async function (ImageUploadItem) {
    const result = await $deleteImage({ index: ImageUploadItem.index, status: status, editId: editId })
    console.log("delete result", result)
  }

  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async event => {
    const file = event.target.files[0]
    const result = await $uploadImage({ image: file, index: imageViewerData.index, status: status, editId: editId })
    if (result.success) {
      await reloadImages()
        .then(setImageViewerVisible(false))
        .catch(err => console.log(err))
      Toast.show("更换成功")
    } else {
      Toast.show("更换失败")
    }
  }

  useImperativeHandle(ref, () => ({
    getFileList() {
      return fileList
    },
  }))

  return (
    <>
      <ImageUploader
        columns={4}
        upload={mockUpload2}
        style={{ "--cell-size": "150px", display: "inline-block" }}
        value={fileList}
        onChange={handleChange}
        onPreview={async (index, file) => {
          setImageViewerData({ image: file.url, index: index })
          setImageViewerVisible(true)
        }}
        preview={false}
        onDelete={handleDelete}
        multiple={true}
        maxCount={maxCount}
        showUpload={fileList.length < maxCount}
        onCountExceed={exceed => {
          Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
        }}
      />
      <ImageViewer
        classNames={{
          mask: "customize-mask",
          body: "customize-body",
        }}
        image={imageViewerData.image}
        visible={imageViewerVisible}
        onClose={() => {
          setImageViewerVisible(false)
        }}
        renderFooter={() => {
          return (
            <div className={styles.footer}>
              <input
                ref={fileInputRef}
                accept="image/jpeg, image/png, image/gif,image/webp"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className={styles.footerButton} onClick={handleButtonClick}>
                更换图像
              </div>
            </div>
          )
        }}
      />
    </>
  )
})

export default ImageUpload
