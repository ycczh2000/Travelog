import axios from "axios"
import { baseURL } from "../config/config.js"

const Instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

Instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token")
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
  //登录失败或没有权限时清除token并跳转页面，跳转时应该有提示选择是否登录或回到首页
  function (error) {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      alert("请求超时，请检查网络连接或稍后再试。")
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("UID")
      localStorage.removeItem("userName")
      alert("登录状态过期，请重新登录")
      window.location.href = "/"
    }
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token")
      localStorage.removeItem("UID")
      localStorage.removeItem("userName")
      alert("没有该权限，请重新登录")
      window.location.href = "/"
    } else {
      console.log("Instance.interceptors.response", error)
    }
    return Promise.reject(error)
  }
)

export default Instance
