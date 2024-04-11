/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-27 18:42:58
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 21:08:19
 * @FilePath: \frontend\src\pages\Publish\Publish.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Publish.js

import React, { useState, useRef, useEffect } from "react"
import "./Publish.css"
import ImageUpload, { getFileList } from "../../components/ImageUpload/ImageUpload"
import { useParams,useNavigate } from "react-router-dom"
import Editing from "../../components/Editing/Editing"
import { LeftOutline } from "antd-mobile-icons"
import { Button, Modal, Toast, Dialog } from "antd-mobile"
import { DownlandOutline, EyeOutline } from "antd-mobile-icons"
import { sendTraveLogToServer } from "../../api/userApi"
import {
  $createEditTravelog,
  $createUpdateTravelog,
  $updateEditTravelog,
  $hasEditTravelog,
  $getEditTravelog,
  $publishEditTravelog,
  $updateTargetTravelog,
  $getImageList,
} from "../../api/travelogApi"

const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [editingData, setEditingData] = useState({})
  const imageUploadRef = useRef(null)
  const editingRef = useRef(null)
  //EditTravelogs表中的id
  const [editId, setEditId] = useState("")
  //要修改的已申请发布游记的id，空值代表创建新游记
  const { targetTravelogId } = useParams()
  const status = targetTravelogId === undefined ? "editing" : "updating"
  const navigate = useNavigate();

  //v2弹出窗口让用户选择加载之前编辑的内容，或是重新创建新的编辑状态游记
  //1.从/publish进入 选择是否加载之前的待发布内容
  const selectEditingTravelog = async () => {
    const res = await $hasEditTravelog("editing")
    const { editId: savedEditId } = res.data
    if (savedEditId) {
      await Dialog.confirm({
        content: "检测到正在编辑中的新游记，是否要读取（点击取消会丢失之前保存的数据）",
        onConfirm: async () => {
          const result = await $getEditTravelog("editing")
          if (result.success) {
            const editData = result.data?.edit
            setEditingData(editData)
            setEditId(savedEditId) //开始加载图片
            Toast.show({
              icon: "success",
              content: "加载成功",
              position: "bottom",
            })
          }
        },
        onCancel: async () => createNewEditingTravelog(), //点击取消时删除之前的，创建新的
      })
    } else {
      await createNewEditingTravelog() //无编辑状态游记
    }
  }

  const createNewEditingTravelog = async () => {
    const result = await $createEditTravelog()
    const newEditId = result.data?.newEdit?._id
    setEditId(newEditId)
    const newEditData = result.data?.newEdit
    setEditingData(newEditData)
  }

  // 2.从/update/:targetTravelogId进入
  const selectUpdatingTravelog = async () => {
    const res = await $hasEditTravelog("updating")
    const { editId: savedEditId, targetTravelogId: savedTargetId } = res.data
    if (savedEditId) {
      await Dialog.confirm({
        content: "检测到正在修改中的游记，是否要读取（点击取消会丢失之前保存的数据）",
        onConfirm: async () => {
          const result = await $getEditTravelog("updating")
          if (result.success) {
            const editData = result.data?.edit
            setEditingData(editData)
            setEditId(savedEditId)
            Toast.show({
              icon: "success",
              content: "加载成功",
              position: "bottom",
            })
          }
        },
        onCancel: async () => createNewUpdatingTravelog(), //点击取消时删除之前的，创建新的
      })
    } else {
      await createNewUpdatingTravelog()
    }
  }

  const createNewUpdatingTravelog = async () => {
    const result = await $createUpdateTravelog({ targetTravelogId: targetTravelogId })
    console.log("createEditTravelog", result)
    const newEditId = result.data?.newEdit?._id
    console.log("createNewEditTravelog", newEditId)
    setEditId(newEditId)
    const newEditData = result.data?.newEdit
    setEditingData(newEditData)
  }

  //初始加载时，选择是否加载之前的编辑状态
  useEffect(() => {
    if (targetTravelogId === undefined) {
      selectEditingTravelog()
    } else {
      selectUpdatingTravelog()
    }
  }, [])

  //定时器，每10秒自动保存草稿
  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const editingDataNow = editingRef.current.getEditingData()
  //     await $updateEditTravelog({ editData: editingDataNow, editId: editId,status:status })
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
    const result1 = await $updateEditTravelog({ editData: editingData, editId: editId, status: status })
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
      Toast.show({
        icon: 'fail',
        content: '标题应该在1到20个字符之间',
      })
      return
    }
    if (editingData.content.length < 1) {
      Toast.show({
        icon: 'fail',
        content: '正文至少有一个字',
      })
      return
    }
    try{
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        reject(new Error("连接超时"));
      }, 5000); // 设置超时时间，为 5 秒
    });
    const result1 = await $updateEditTravelog({ editData: editingData, editId: editId, status: status });
    if (!result1.success) {
      throw new Error("在服务端发送笔记前保存失败");
    }
    const result = await $updateTargetTravelog({ editId: editId })
    if(!result.success){
      throw new Error("在服务端发送笔记失败");
    }
    if (result.success) {
      clearTimeout(timer);
      setTimeout(() => {
        window.location.href = `/mytravelog`
      }, 1000)
    }
  }
    catch (error) {
      console.error("Error:", error);
      Toast.show({ content: {error}, position: "bottom" })
      return;
    }
  }

  const handleSaveDraftClick = async () => {
    const fileList = imageUploadRef.current.getFileList()
    const editingData = editingRef.current.getEditingData()
    const result = await $updateEditTravelog({ editData: editingData, editId: editId, status: status })
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
    }
  }

  const handleGoBack = () => {
    window.history.go(-1) // 返回上一页面
  }

  const handlePreviewClick =async () => {
    await handleSaveDraftClick()
    const Data = editingRef.current.getEditingData()
    editingData.rate=Data.rate
    console.log("handlePreviewClick", editingData)
    // const result1 = await $updateEditTravelog({ editData: editingData, editId: editId, status: status });//在预览前，先保存
    const combinedData = {
      fileList: fileList,
      editingData: editingData
    };
    navigate(`/previewpage/${encodeURIComponent(JSON.stringify(combinedData))}`);
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
        <ImageUpload ref={imageUploadRef} fileList={fileList} editId={editId} status={status} />
        <Editing ref={editingRef} editingData={editingData} />
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "0", right: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <Button onClick={handleSaveDraftClick} style={{ background: "transparent", border: "none" }}>
            <DownlandOutline /> 保存
          </Button>
          <Button style={{ background: "transparent", border: "none" }} onClick={handlePreviewClick}>
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
