/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-27 18:42:58
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-06 17:56:17
 * @FilePath: \frontend\src\pages\Publish\Publish.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Publish.js

import React, { useState, useRef, useEffect } from "react"
import "./Publish.css"
import ImageUpload, { getFileList } from "../../components/ImageUpload/ImageUpload"
import Editing from "../../components/Editing/Editing"
import { LeftOutline } from "antd-mobile-icons"
import { Button, Modal, Toast } from "antd-mobile"
import { DownlandOutline, EyeOutline } from "antd-mobile-icons"
import { sendTraveLogToServer } from "../../api/userApi"
import {
  $createEditTravelog,
  $updateEditTravelog,
  $hasEditTravelog,
  $getEditTravelog,
  $publishEditTravelog,
} from "../../api/travelogApi"

//组件说明
//
const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [editingData, setEditingData] = useState({})
  const imageUploadRef = useRef(null)
  const editingRef = useRef(null)
  const [editId, setEditId] = useState("")
  //编辑文档的id

  const loadEditTravelog = async () => {
    await Modal.alert({
      content: "人在天边月上明",
    })
    Toast.show({ content: "已关闭", position: "bottom" })
  }

  //v2弹出窗口让用户选择加载之前编辑的内容，或是创建新的编辑状态的游记
  const hasEditTravelog = async () => {
    const res = await $hasEditTravelog()
    console.log("$hasEditTravelog", res)
    const editId = res.data?.editId
    console.log("editId", editId)
    //当前用户有正在编辑的的游记
    if (editId) {
      setEditId(editId)
      const result = await $getEditTravelog()
      const editData = result.data?.edit
      setEditingData(editData)
    } else {
      const result = await $createEditTravelog()
      console.log("createEditTravelog", result)
      const editId = result.data?.newEdit?._id
      setEditId(editId)
    }
  }

  //初始加载时，判断是否有编辑状态的游记
  useEffect(() => {
    hasEditTravelog()
  }, [])

  // useEffect(() => {}, [editId])

  const getEditTravelog = async () => {
    //确认有无编辑状态的游记 返回 游记id
    const res = await $hasEditTravelog()
    console.log("$hasEditTravelog", res)
    // const result = await $createEditTravelog()
    // if (result.data?.newEdit?._id) {
    //   setEditId(result.data?.newEdit?._id)
    // }
    // console.log(result)
  }

  const handlePublishClick2 = async () => {
    const editingData = editingRef.current.getEditingData()

    if (editingData.title.length < 1 || editingData.title.length > 20) {
      alert("Title length should be between 1 and 20 characters.") // 使用alert弹出消息提示
      return
    }
    if (editingData.content.length < 1) {
      alert("Title length should be at least 1 character.") // 使用alert弹出消息提示
      return
    }
    const result1 = await $updateEditTravelog({ editData: editingData, editId: editId })
    // const result = await $publishEditTravelog({ editId: editId })
    // if (result1.status === 'success') {
    // 如果第一个请求成功，则发送第二个请求，并等待结果
    const result2 = await $publishEditTravelog({ editId: editId })
    console.log("handlePublishClick2 result2:", result2)
    // }
    console.log("handlePublishClick2 result1:", result1)
    if (result2.success === true) {
      Toast.show({ content: "发布成功", position: "bottom" })
      //在定时器结束前再次点击发布按钮会出bug
      setTimeout(() => {
        window.history.go(-1) // 返回上一页面
      }, 1000)
    } else {
      Toast.show({ content: "发布失败", position: "bottom" })
    }
    // const result = await $publishEditTravelog({ editId: editId })
    // console.log("handlePublishClick2 result:", result)
  }

  const handleSaveDraftClick = async () => {
    const fileList = imageUploadRef.current.getFileList()
    const editingData = editingRef.current.getEditingData()
    const result = await $updateEditTravelog({ editData: editingData, editId: editId })
    console.log(editingData)
    console.log(result)
    setEditingData(result.data)
    const draftData = JSON.stringify({ fileList, editingData })
    localStorage.setItem("draftData", draftData)
    console.log("Draft saved!")
  }

  const handleGoBack = () => {
    window.history.go(-1) // 返回上一页面
  }
  return (
    <div style={{ margin: "10px" }}>
      {" "}
      {/* 添加外边距 */}
      <div>
        <Button style={{ background: "transparent", border: "none" }} onClick={handleGoBack}>
          <LeftOutline />
        </Button>
      </div>
      <div style={{ margin: "10px", marginTop: "0px" }}>
        <ImageUpload ref={imageUploadRef} fileList={fileList} />
        <Editing ref={editingRef} editingData={editingData} />
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "0", right: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <Button onClick={handleSaveDraftClick} style={{ background: "transparent", border: "none" }}>
            <DownlandOutline /> 存草稿
          </Button>
          <Button style={{ background: "transparent", border: "none" }}>
            <EyeOutline /> 预览
          </Button>
          <Button
            onClick={handlePublishClick2}
            style={{ backgroundColor: "red", color: "white", borderRadius: "20px", flex: "1", marginLeft: "10px" }}>
            发布游记
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Publish
