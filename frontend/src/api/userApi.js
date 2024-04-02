import axios from "./axiosInstance"

export const $login = async params => {
  let { data } = await axios.post("login", params)
  return data
}

export const $register = async params => {
  let { data } = await axios.post("register", params)
  return data
}

export const $uploadAvatar = async file => {
  const formData = new FormData()
  formData.append("image", file)
  let { data } = await axios.post("/uploadAvator", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

export const $getAvatar = async username => {
  let { data } = await axios.get("/getAvatar", { params: { username } })
  return data
}
