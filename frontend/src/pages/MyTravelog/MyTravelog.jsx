import React, { useState, useEffect } from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
import { UpOutline, CloseCircleFill, StarFill } from "antd-mobile-icons"
import styles from "./MyTravelog.module.scss"
import { UserSpaceContentProvider } from "./UserSpaceContent"
import { UserContext } from "../../Context/UserContext"
import { card, Toast } from "antd-mobile"
import "./MyTravelog.css"
import { $getMyTravelogs, $deleteTravelog } from "../../api/travelogApi"

export default function MyTravelog() {
  const { UID, setUID, userName, setUserName } = React.useContext(UserContext)
  console.log(userName, UID)
  const [myTravelogList, setMyTravelogList] = useState([])
  const [totop, setTotop] = useState(true)
  // const [username, setUsername] = useState("MOMO")
  // const [uid, setUid] = useState("1145141919810")

  const [avatarUrl, setAvatarUrl] = useState(
    "https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712595600&t=76261ab2a1585815f46c7b306c6f66e3"
  )
  const loadingData = async () => {
    const res = await $getMyTravelogs()
    if (res.success) {
      setMyTravelogList(res.data)
    }
  }
  useEffect(() => {
    loadingData()
  }, [])

  //删除方法 传入id 返回bool 之后只从前端移除myTravelogList中对应项，不用重新请求、加载数据
  //通过props向下传
  const deleteTravelog = async id => {
    console.log("deleteTravelog", id)
    const res = await $deleteTravelog(id)
    console.log(res)
    if (res.success) {
      const newMyTravelogList = myTravelogList.filter(item => item._id !== id)
      setMyTravelogList(newMyTravelogList)
      Toast.show("删除成功")
    } else Toast.show("删除失败")
  }

  return (
    <>
      <UserSpaceContentProvider>
        <div className="background-image"></div>
        <MyTravelogHeader />
        <div className="user-space">
          <div className="content">
            <div className="avatar">
              <img src={avatarUrl} alt="User Avatar" />
            </div>
            <div className="user-details">
              <div className="username">{userName ? userName : "MOMO"}</div>
              <div className="uid">UID: {UID ? UID : 1145141919810}</div>
            </div>
          </div>
        </div>
        <MyTravelogFilter />
        <MyTravelogList myTravelogList={myTravelogList} deleteTravelog={deleteTravelog} />
        {totop ? (
          <div
            className={styles.totop}
            onClick={() => {
              // 点击后滚动到页面顶部
              window.scrollTo({
                top: 0,
                behavior: "smooth", // 平滑滚动
              })
            }}>
            <UpOutline style={{ fontSize: "1rem" }} />
          </div>
        ) : (
          <></>
        )}
      </UserSpaceContentProvider>
    </>
  )
}
