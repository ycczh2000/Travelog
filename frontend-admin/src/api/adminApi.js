import axios from "./axiosInstance"

export const $login = async params => {
  const { data } = await axios.post("admin/login", params)
  console.log("respond: ", data)
  return data
}

export const $register = async params => {
  const { data } = await axios.post("admin/register", params)
  console.log("respond: ", data)
  return data
}

//传query
export const $travelogs = async params => {
  const { data } = await axios.get("admin/travelogs", { params })
  return data
}

// export const $loginByCookie = async () => {
//   try {
//     const { data } = await axios.post("login/cookie")
//     console.log("respond: ", data)
//     return data
//   } catch (error) {
//     console.error("Error:", error)
//   }
// }
