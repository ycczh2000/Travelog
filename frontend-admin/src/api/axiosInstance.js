import axios from "axios"
export const baseURL = "http://localhost:8000/"
const Instance = axios.create({
  baseURL: baseURL,
  timeout: 2000,
})

Instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("admintoken")) {
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
  function (error) {
    return Promise.reject(error)
  }
)

export default Instance
