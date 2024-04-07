import axios from "./axiosInstance"

//1.创建编辑状态的游记
export const $createEditTravelog = async params => {
  const { data } = await axios.post("/travelogs/edit", params)
  console.log("respond: ", data)
  return data
}

//2.更新当前编辑的游记
export const $updateEditTravelog = async params => {
  console.log("params: ", params)
  const { data } = await axios.put("/travelogs/edit", params)
  console.log("respond: ", data)
  return data
}

//3.1 发布新游记-不存在原游记
export const $publishEditTravelog = async params => {
  const { editId } = params
  const { data } = await axios.post("/travelogs/edit/publish", { editId })
  return data
}

//4.0 获取图片列表
//{message: "获取成功",success: true, data: ["image1.png", "image1.jpg", ...] }
//{message: "找不到图片列表", success: false, data: {}}
export const $getImageList = async () => {
  const { data } = await axios.get("/travelogs/edit/images")
  return data
}

//4.上传或更新第i张图片 返回图片名列表["image1.png", "image1.jpg", ...]
export const $uploadImage = async params => {
  const { image, index } = params
  const formData = new FormData()
  formData.append("image", image)
  formData.append("index", index)
  const { data } = await axios.post("/travelogs/edit/uploadimg", formData)
  return data
}

//5.删除第i张图片
export const $deleteImage = async params => {
  const { index } = params
  const { data } = await axios.delete("/travelogs/edit/deleteimg", { params: { index } })
  return data
}

//6.查询是否有正在编辑的游记 游记id
export const $hasEditTravelog = async () => {
  const { data } = await axios.get("/travelogs/editid")
  return data
}

//7.获取正在编辑的游记
export const $getEditTravelog = async () => {
  const { data } = await axios.get("/travelogs/edit")
  return data
}

//8.(首页)随机获取一些游记
export const $getTravelogs = async (city, selectedFilters, searchTerm)  => {
  // const { data } = await axios.get("/travelogs",{city, selectedFilters, searchTerm})
  const { data } = await axios.get("/travelogs", {
    params: {
      city,
      selectedFilters,
      title:searchTerm//搜索title
    }})
  return data
}

//9.获取特定id游记
export const $getTravelogsByID = async id => {
  const { data } = await axios.get(`/travelogs/${id}`)
  return data
}

//10.发送删除游记请求
export const $deleteTravelog = async id => {
  const { data } = await axios.delete(`/travelogs/${id}`)
  return data
}