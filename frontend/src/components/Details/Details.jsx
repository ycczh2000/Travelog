/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 21:37:54
 * @FilePath: \frontend\src\components\Details\Details.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect } from "react"
import { Button, Toast } from "antd-mobile"
import "./Details.css"
import { UserContext } from "../../Context/UserContext"
import { baseURL } from "../../config/config"
import { convertUTCToBeijingTimeWithSecond } from "../../utils/utils"
import { defaultAvatar } from "../../config/config"
const Details = ({ detailInfo }) => {
  const [followed, setFollowed] = React.useState(false)
  const { userName } = useContext(UserContext) //自己账户的用户名,N是大写的，区别于作者名的username

  useEffect(() => {
    const followingList = JSON.parse(localStorage.getItem("followingList"))
    if (followingList && followingList.includes(detailInfo.username)) {
      setFollowed(true)
    } else {
      setFollowed(false)
    }
  }, [detailInfo.username])
  const handleFollowed = () => {
    if (userName === detailInfo.username) {
      Toast.show({
        icon: "fail",
        content: "不能关注自己",
      })
      return
    }
    if (followed) {
      // 如果已经关注，则取消关注
      setFollowed(false)
      const followingList = JSON.parse(localStorage.getItem("followingList"))
      if (followingList) {
        const updatedList = followingList.filter(username => username !== detailInfo.username)
        localStorage.setItem("followingList", JSON.stringify(updatedList))
        // 向后端发送取消关注的请求
        Toast.show({
          icon: "success",
          content: "取消关注成功",
        })
      }
    } else {
      // 如果尚未关注，则关注
      setFollowed(true)
      const followingList = JSON.parse(localStorage.getItem("followingList")) || []
      localStorage.setItem("followingList", JSON.stringify([...followingList, detailInfo.username]))
      // 向后端发送关注的请求
      Toast.show({
        icon: "success",
        content: "关注成功",
      })
    }
  }
  return (
    <div className="contain2">
      <img
        className="imager"
        src={`${baseURL}getAvatar/${detailInfo.username}`}
        onError={e => {
          e.target.src = defaultAvatar
        }}
      />
      <div className="info">
        <h3>{detailInfo.username}</h3>
        <p>{detailInfo.createDate ? convertUTCToBeijingTimeWithSecond(detailInfo.createDate) : "未知"}</p>
      </div>
      <Button
        className="button1"
        color={userName === detailInfo.username ? "danger" : followed ? "primary" : "primary"}
        fill={userName === detailInfo.username ? "outline" : followed ? "outline" : "solid"}
        onClick={handleFollowed}
        style={{ width: "80px" }}>
        {userName === detailInfo.username ? "自己" : followed ? "已关注" : "关注"}
      </Button>
    </div>
  )
}

export default Details
