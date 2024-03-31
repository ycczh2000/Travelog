import React, { useState } from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
import { UpOutline, CloseCircleFill, StarFill } from "antd-mobile-icons"
import styles from "./MyTravelog.module.scss"
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
  const [myTravelogList, setMyTravelogList] = useState(data)
  const [totop, setTotop] = useState(true)
  return (
    <>
      <MyTravelogHeader />
      <MyTravelogFilter />
      <MyTravelogList myTravelogList={myTravelogList} />
      {totop ? (
        <div
          className={styles.totop}
          onClick={() => {
            document.documentElement.scrollTop = 0
          }}>
          <UpOutline style={{ fontSize: "1rem" }} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
