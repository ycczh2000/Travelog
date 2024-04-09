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
import { useParams } from "react-router-dom"
import Editing from "../../components/Editing/Editing"
import { LeftOutline } from "antd-mobile-icons"
import { Button, Modal, Toast, Dialog } from "antd-mobile"
import { DownlandOutline, EyeOutline } from "antd-mobile-icons"
import { sendTraveLogToServer } from "../../api/userApi"
import {
  $createEditTravelog,
  $updateEditTravelog,
  $hasEditTravelog,
  $getEditTravelog,
  $publishEditTravelog,
  $updateTargetTravelog,
} from "../../api/travelogApi"

const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [editingData, setEditingData] = useState({})
  const imageUploadRef = useRef(null)
  const editingRef = useRef(null)
  //编辑表中的id
  const [editId, setEditId] = useState("")
  //要修改的已申请发布游记的id，空值代表创建新游记
  const { targetTravelogIdInLocation } = useParams()
  const [targetTravelogId, setTargetTravelogId] = useState(targetTravelogIdInLocation)
  console.log("targetId", targetTravelogId)

  //v2弹出窗口让用户选择加载之前编辑的内容，或是重新创建新的编辑状态游记
  //进入时的路由有两种情况：/publish，/update/:targetTravelogIdInLocation
  //保存状态有三种情况：1.无:editId不存在  2.保存待发布游记:targetTravelogId不存在  3.保存未修改完的游记:targetTravelogId存在
  const selectEditTravelog = async () => {
    const res = await $hasEditTravelog()
    console.log("$hasEditTravelog", res)
    const { editId: savedEditId, targetTravelogId: savedTargetId } = res.data
    console.log("$hasEditTravelog", res.data)
    console.log("savedEditId", savedEditId)
    //当前用户是否有正在编辑的的游记
    if (savedEditId) {
      //有的情况
      const content = savedTargetId ? "检测到已保存的修改中的游记" : "检测到已保存的编辑中的新游记"
      await Dialog.confirm({
        content: content + "，是否要读取（点击取消会丢失之前保存的数据）",
        //点击确定获取详细信息
        onConfirm: async () => {
          const result = await $getEditTravelog()
          console.log("$getEditTravelog", result)
          if (result.success) {
            const editData = result.data?.edit
            if (savedTargetId && window.location.pathname !== `/update/${savedTargetId}`) {
              window.location.replace(`/update/${savedTargetId}`)
            }
            if (!savedTargetId && window.location.pathname !== `/publish`) {
              window.location.replace(`/publish`)
            }
            setEditingData(editData)
            setEditId(savedEditId)
            Toast.show({
              icon: "success",
              content: "加载成功",
              position: "bottom",
            })
          }
        },
        onCancel: async () => createNewEditTravelog(), //点击取消时删除之前的，创建新的
      })
    } else {
      await createNewEditTravelog() //无编辑状态游记
    }
  }

  const createNewEditTravelog = async () => {
    const result = await $createEditTravelog({ targetTravelogId: targetTravelogId })
    console.log("createEditTravelog", result)
    const newEditId = result.data?.newEdit?._id
    console.log("createNewEditTravelog", newEditId)
    setEditId(newEditId)
    const newEditData = result.data?.newEdit
    setEditingData(newEditData)
  }

  //初始加载时，选择是否加载之前的编辑状态
  useEffect(() => {
    selectEditTravelog()
  }, [])

  //定时器，每10秒自动保存草稿
  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const editingDataNow = editingRef.current.getEditingData()
  //     await $updateEditTravelog({ editData: editingDataNow, editId: editId })
  //   }, 10000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [editId])

  const handlePublishClick = async () => {
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

  const handleUpdateClick = async () => {
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
    const result = await $updateTargetTravelog({ editId: editId })
    console.log("$updateTargetTravelog", result)
    if (result.success) {
      setTimeout(() => {
        window.location.href = `/mytravelog` // 返回上一页面
      }, 1000)
    }
  }

  const handleSaveDraftClick = async () => {
    const fileList = imageUploadRef.current.getFileList()
    const editingData = editingRef.current.getEditingData()
    const result = await $updateEditTravelog({ editData: editingData, editId: editId })
    if (result.success) {
      Toast.show({
        icon: "success",
        content: "保存成功",
        position: "center",
      })
    } else {
      Toast.show({
        icon: "failed",
        content: result.message,
        position: "center",
      })
      console.log(editingData)
      console.log(result)
      setEditingData(result.data)
      console.log("Draft saved!")
    }
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
        <ImageUpload ref={imageUploadRef} fileList={fileList} editId={editId} />
        <Editing ref={editingRef} editingData={editingData} />
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "0", right: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <Button onClick={handleSaveDraftClick} style={{ background: "transparent", border: "none" }}>
            <DownlandOutline /> 保存
          </Button>
          <Button style={{ background: "transparent", border: "none" }}>
            <EyeOutline /> 预览
          </Button>
          {targetTravelogId ? (
            <Button
              onClick={handleUpdateClick}
              style={{ backgroundColor: "red", color: "white", borderRadius: "20px", flex: "1", marginLeft: "10px" }}>
              修改游记
            </Button>
          ) : (
            <Button
              onClick={handlePublishClick}
              style={{ backgroundColor: "red", color: "white", borderRadius: "20px", flex: "1", marginLeft: "10px" }}>
              发布游记
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Publish
