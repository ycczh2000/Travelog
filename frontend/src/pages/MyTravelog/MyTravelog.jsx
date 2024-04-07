import React, { useState } from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
import { UpOutline, CloseCircleFill, StarFill } from "antd-mobile-icons"
import styles from "./MyTravelog.module.scss"
import { UserSpaceContentProvider } from "./UserSpaceContent"
import { UserContext } from "../../Context/UserContext"
import { card, Popover } from "antd-mobile"
import './MyTravelog.css';

const data = [
  {
    id: 1,
    title: "Title 1",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: 0,
    uploadTime: "2021-09-01",
    examineTime: "2021-09-02",
    reason: "",
  },
  {
    id: 2,
    title: "Title 2",
    imageUrl: "https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392",
    examine: -1,
    reason: "图片违规",
  },
  {
    id: 3,
    title: "Title 3",
    imageUrl: "https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392",
    likes: 10,
    examine: 1,
  },
  {
    id: 4,
    title: "Title 3",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: -1,
    reason: "图片违规",
  },
  {
    id: 5,
    title: "Title 3",
    imageUrl: "https://img2.baidu.com/it/u=1414537138,3276026308&fm=253&fmt=auto&app=120&f=JPEG?w=607&h=405",
    examine: 1,
    likes: 2,
  },
  {
    id: 6,
    title: "Title 3",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: 0,
  },
]

export default function MyTravelog() {
  const { UID, setUID, userName, setUserName } = React.useContext(UserContext)
  console.log(userName, UID)
  const [myTravelogList, setMyTravelogList] = useState(data)
  const [totop, setTotop] = useState(true)
  // const [username, setUsername] = useState("MOMO")
  // const [uid, setUid] = useState("1145141919810")
  const [avatarUrl, setAvatarUrl] = useState("https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712595600&t=76261ab2a1585815f46c7b306c6f66e3")
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
        <MyTravelogList myTravelogList={myTravelogList} />
        {totop ? (
          <div
            className={styles.totop}
            onClick={() => {
              // 点击后滚动到页面顶部
              window.scrollTo({
                top: 0,
                behavior: 'smooth' // 平滑滚动
              });
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
