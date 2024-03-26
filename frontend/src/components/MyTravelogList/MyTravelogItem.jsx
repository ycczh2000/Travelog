import React from "react"
import { Image, Space, Tag } from "antd-mobile"
import styles from "./MyTravelogItem.module.scss"
// import "./MyTravelogItem.scss"
const i = {
  id: 6,
  title: "Title 3",
  imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
  examine: 0,
}
//上传时间 审核结束时间 排序
export default function MyTravelogItem(props) {
  const { item } = props
  console.log(item)
  return (
    <div className={styles.myTravelogItem}>
      {/* <img src={item.imageUrl} /> */}
      <Image className={styles.myTravelogImg} src={item.imageUrl} width={150} height={100} fit="cover" />
      <div className={styles.MyTravelogItemInfo}>
        <div className="item-title">{item.title}</div>
        {item.examine === 0 ? (
          <Tag color="primary" fill="outline">
            审核中
          </Tag>
        ) : null}
        {item.examine === 1 ? (
          <Tag color="#87d068" fill="outline">
            已通过
          </Tag>
        ) : null}
        {item.examine === -1 ? (
          <Tag color="#ff6430" fill="outline">
            未通过
          </Tag>
        ) : null}
      </div>
    </div>
  )
}
