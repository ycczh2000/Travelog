import axios from "./axiosInstance"

export const $login = async params => {
  let { data } = await axios.post("login", params)
  return data
}

export const $register = async params => {
  let { data } = await axios.post("register", params)
  return data
}
