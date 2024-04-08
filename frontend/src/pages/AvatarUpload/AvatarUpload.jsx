import React, { useState } from "react"

import { ImageUploader, Space, Toast, Dialog, Button, Image } from "antd-mobile"
import { PictureOutline } from "antd-mobile-icons"
import styles from "./AvatarUpload.module.scss"
import { $uploadAvatar, $getAvatar } from "../../api/userApi"

//纯测试组件，用于测试头像与图片上传功能
export default function AvatarUpload() {
  const [fileList, setFileList] = useState([])
  const [image, setImage] = useState(null)
  // FileReader()
  const upload = async () => {
    console.log("image", image)
    const res = await $uploadAvatar(image)
      .then(res => console.log("res", res))
      .catch(err => console.log("err", err))
  }

  const handleClick = e => {
    console.log("e.target", e.target)
    console.dir(e.target)
  }

  return (
    <>
      <img src="http://localhost:8000/getAvatar/user123456" style={{ width: "5rem", height: "5rem" }} />
      <Image
        onContainerClick={handleClick}
        src="https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
      />
      <ImageUploader
        className={styles.ImageUploader}
        preview={false}
        maxCount={1}
        value={fileList}
        onChange={items => {
          setFileList(items)
          console.log("items", items)
        }}
        upload={file => {
          console.log(file)
          setImage(file)
          return {
            url: URL.createObjectURL(file),
          }
        }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#999999",
          }}>
          <PictureOutline style={{ fontSize: 32 }} />
        </div>
      </ImageUploader>
      <Button onClick={() => upload(fileList[0])}>确认头像</Button>
    </>
  )
}
