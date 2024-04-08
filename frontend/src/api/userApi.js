/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-08 18:42:06
 * @FilePath: \frontend\src\api\userApi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

export const $getAvatar = async (username) => {
  console.log(`/getAvatar/${username}`);
  let { data } = await axios.get(`/getAvatar/${username}`);
  return data;
};


export const sendTraveLogToServer = async (fileList,imgInfo, editingData) => {
    const data = {
        fileList: fileList,
        imgInfo: imgInfo,
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
      console.log("发送游记",data)
        const response = await axios.post("/travelogs", data,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
    } catch (error) {
        throw new Error('向服务器发送请求失败: ' + error.message);
    }
};
