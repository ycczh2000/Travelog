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

export const sendTraveLogToServer = async (fileList, editingData) => {
    const data = {
        fileList: fileList,
        editingData: editingData
    };
    axios.interceptors.request.use(config => {
        console.log('发送的请求:', config);
        return config;
    }, error => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    });

    try {
        const response = await axios.post("/travelogs", data);
        return response.data;
    } catch (error) {
        throw new Error('向服务器发送请求失败: ' + error.message);
    }
};
