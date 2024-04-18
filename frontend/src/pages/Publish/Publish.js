import React, { useState, useRef, useEffect } from "react"
import "./Publish.css"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import { useParams, useNavigate } from "react-router-dom"
import Editing from "../../components/Editing/Editing"
import { LeftOutline } from "antd-mobile-icons"
import { Button, Toast, Dialog } from "antd-mobile"
import { DownlandOutline, EyeOutline } from "antd-mobile-icons"
import {
  $createEditTravelog,
  $createUpdateTravelog,
  $updateEditTravelog,
  $hasEditTravelog,
  $getEditTravelog,
  $publishEditTravelog,
  $updateTargetTravelog,
} from "../../api/travelogApi"

const Publish = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [editingData, setEditingData] = useState({})
  const imageUploadRef = useRef(null)
  const editingRef = useRef(null)
  const [editId, setEditId] = useState("") //EditTravelogs表中的id
  const { targetTravelogId } = useParams() //要修改的已申请发布游记的id，空值代表创建新游记
  const status = targetTravelogId === undefined ? "editing" : "updating"
  const navigate = useNavigate()

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
    const newEditId = result.data?.newEdit?._id
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

  // 定时器，每20秒自动保存草稿
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const editingDataNow = editingRef.current.getEditingData()
      await $updateEditTravelog({ editData: editingDataNow, editId: editId, status: status })
    }, 20000)

    return () => {
      clearInterval(intervalId)
    }
  }, [editId])

  const verifyEditingData = () => {
    const editingData = editingRef.current.getEditingData()
    const fileList = imageUploadRef.current.getFileList()
    if (fileList.length < 1) {
      setIsUploading(false)
      Toast.show({ content: "至少需要一张图片" })
      return false
    }
    if (editingData.title.length < 1 || editingData.title.length > 20) {
      setIsUploading(false)
      Toast.show({ content: "标题应该在1到20个字之间" })
      return false
    }
    if (editingData.content.length < 1) {
      setIsUploading(false)
      Toast.show({ content: "正文至少要有一个字" })
      return false
    }
    return true
  }

  const handlePublishClick = async () => {
    setIsUploading(true)
    if (!verifyEditingData()) return
    const editingData = editingRef.current.getEditingData()
    const result1 = await $updateEditTravelog({ editData: editingData, editId: editId, status: status })
    const result2 = await $publishEditTravelog({ editId: editId })
    if (result2.success === true) {
      Toast.show({ content: "发布成功", position: "bottom" })
      setTimeout(() => {
        setIsUploading(false)
        window.history.go(-1) // 返回上一页面
      }, 1000)
    } else {
      Toast.show({ content: "发布失败", position: "bottom" })
      setIsUploading(false)
    }
  }

  const handleUpdateClick = async () => {
    setIsUploading(true)
    if (!verifyEditingData()) return
    const editingData = editingRef.current.getEditingData()
    try {
      const result1 = await $updateEditTravelog({ editData: editingData, editId: editId, status: status })
      if (!result1.success) {
        setIsUploading(false)
        Toast.show({
          icon: "fail",
          content: result1.message || "更新失败",
        })
        return
      }
      const result = await $updateTargetTravelog({ editId: editId })
      if (!result.success) {
        setIsUploading(false)
        Toast.show({
          icon: "fail",
          content: result.message || "更新失败",
        })
        return
      } else if (result.success) {
        Toast.show({
          content: result.message || "更新成功",
        })
        setTimeout(() => {
          setIsUploading(false)
          window.location.href = `/mytravelog`
        }, 1000)
      }
    } catch (error) {
      console.error("Error:", error)
      Toast.show({ content: { error }, position: "bottom" })
      setIsUploading(false)
      return
    }
  }

  const handleSaveDraftClick = async () => {
    const editingData = editingRef.current.getEditingData()
    if (!verifyEditingData()) return
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
      setEditingData(result.data)
    }
  }

  const handleGoBack = () => {
    window.history.go(-1)
  }

  const handlePreviewClick = async () => {
    const fileList = imageUploadRef.current.getFileList()
    await handleSaveDraftClick()
    const Data = editingRef.current.getEditingData()
    editingData.rate = Data.rate
    editingData.content = Data.content
    editingData.title = Data.title
    editingData.tripBudget = Data.tripBudget
    editingData.tripNum = Data.tripNum
    editingData.tripDate = Data.tripDate
    editingData.tripWay = Data.tripWay
    console.log('########################',editingData.images,fileList)
    const extractedNames = fileList.map(filePath => {
      const parts = filePath.url.split('/');
      const filename = parts[parts.length - 1];
      return filename;
    });
    editingData.images=extractedNames
    console.log('########################',editingData.images)
    const combinedData = {
      fileList: fileList,
      editingData: editingData,
    }
    console.log("combinedData", combinedData)
    navigate(`/previewpage/${encodeURIComponent(JSON.stringify(combinedData))}`)
  }
  return (
    <div style={{ margin: "10px" }}>
      <div>
        <Button style={{ background: "transparent", border: "none" }} onClick={handleGoBack}>
          <LeftOutline />
        </Button>
      </div>
      <div style={{ margin: "10px", marginTop: "0px" }}>
        <ImageUpload ref={imageUploadRef} editId={editId} status={status} />
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
              disabled={isUploading}
              style={{ backgroundColor: "red", color: "white", borderRadius: "20px", flex: "1", marginLeft: "10px" }}>
              修改游记
            </Button>
          ) : (
            <Button
              onClick={handlePublishClick}
              disabled={isUploading}
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
