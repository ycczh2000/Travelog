import axios from "axios"
import { baseURL } from "../config/config"
const Instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
})

Instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("admintoken")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("admintoken")
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      alert("请求超时，请检查网络连接或稍后再试。")
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admintoken")
      alert("登录状态过期，请重新登录")
      window.location.href = "/login"
    }
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("admintoken")
      alert("没有该权限，请重新登录")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default Instance
