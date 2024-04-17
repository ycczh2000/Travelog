import axios from "./axiosInstance"

//1.创建编辑状态的游记 该方法同时会从editravelogs表中删除当前用户其它处于编辑状态的游记
export const $createEditTravelog = async () => {
  const { data } = await axios.post("/travelogs/edit")
  console.log("$createEditTravelog", data)
  return data
}

//1.2 创建一个编辑状态的游记，targetTravelogId指向一个已有的游记
export const $createUpdateTravelog = async params => {
  console.log("$createUpdateTravelog params", params)
  const { targetTravelogId } = params
  const { data } = await axios.post("/travelogs/updating", { targetTravelogId })
  console.log("respond: ", data)
  return data
}

//2.更新当前编辑的游记
export const $updateEditTravelog = async params => {
  const { editData, editId, status } = params
  const { data } = await axios.put("/travelogs/edit", { editData, editId, status })
  console.log("respond: ", data)
  return data
}

//3.1 发布新游记-不存在原游记
export const $publishEditTravelog = async params => {
  const { editId } = params
  const { data } = await axios.post("/travelogs/edit/publish", { editId })
  return data
}

//3.2更新游记-原游记存在
export const $updateTargetTravelog = async params => {
  const { editId } = params
  const { data } = await axios.put("/travelogs/edit/update", { editId })
  return data
}

//4.0 获取图片列表
//{message: "获取成功",success: true, data: ["image1.png", "image1.jpg", ...] }
//{message: "找不到图片列表", success: false, data: {}}
export const $getImageList = async editId => {
  const { data } = await axios.get(`/travelogs/edit/images/${editId}`)
  return data
}

//4.上传或更新第i张图片 返回图片名列表["image1.png", "image1.jpg", ...]
export const $uploadImage = async params => {
  const { image, index, status, editId } = params
  const formData = new FormData()
  formData.append("image", image)
  formData.append("index", index)
  formData.append("status", status)
  formData.append("editId", editId)
  const { data } = await axios.post("/travelogs/edit/uploadimg", formData)
  return data
}

//5.删除第i张图片
export const $deleteImage = async params => {
  const { index, status, editId } = params
  const { data } = await axios.delete("/travelogs/edit/deleteimg", { params: { index, status, editId } })
  return data
}

//6.查询某个用户编辑区是否已有待发布或待更新的游记 返回{editId,targetTravelogId} status:edit或updating
export const $hasEditTravelog = async status => {
  const { data } = await axios.get(`/travelogs/editid/${status}`)
  return data
}

//7.获取某个用户编辑区一篇待发布或待更新游记 返回{edit:{editId,targetTravelogId,...}} status:edit或updating
export const $getEditTravelog = async status => {
  const { data } = await axios.get(`/travelogs/edit/${status}`)
  console.log("$getEditTravelog", data)
  return data
}

//8.(首页)随机获取一些游记
export const $getTravelogs = async (city, selectedFilters, searchTerm, searchMode) => {
  let params = {
    city,
    selectedFilters,
  }

  if (searchMode === "user") {
    params.username = searchTerm
  } else {
    params.title = searchTerm
  }
  console.log("params:", params)
  const { data } = await axios.get("/travelogs", {
    params: params,
  })

  return data
}

//9.获取特定id游记 共有
export const $getTravelogsByID = async id => {
  const { data } = await axios.get(`/travelogs/${id}`)
  return data
}

//10.发送删除游记请求
//返回格式 {success: true, message: "删除成功"}
export const $deleteTravelog = async id => {
  const { data } = await axios.delete(`/travelogs/${id}`)
  return data
}

//11.获取我的游记列表
export const $getMyTravelogs = async () => {
  const { data } = await axios.get("/mytravelogs")
  return data
}
