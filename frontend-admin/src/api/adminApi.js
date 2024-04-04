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

export const $travelogs = async params => {
  const { data } = await axios.get("admin/travelogs", { params })
  return data
}

export const $deleteTravelog = async id => {
  const { data } = await axios.delete(`admin/travelogs/${id}`)
  return data
}

export const $travelog = async id => {
  const { data } = await axios.get(`admin/travelogs/${id}`)
  return data
}

export const $auditTravelog = async (id, params) => {
  const { data } = await axios.put(`admin/travelogs/${id}`, params)
  return data
}
