import React from "react"
import { useState } from "react"

import MyTravelogItem from "./MyTravelogItem"

const data = [
  {
    id: 1,
    title: "Title 1",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: 0,
    uploadTime: "2021-09-01",
    examineTime: "2021-09-02",
  },
  {
    id: 2,
    title: "Title 2",
    imageUrl: "https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392",
    examine: 1,
  },
  {
    id: 3,
    title: "Title 3",
    imageUrl: "https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392",
    examine: 0,
  },
  {
    id: 4,
    title: "Title 3",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: -1,
  },
  {
    id: 5,
    title: "Title 3",
    imageUrl: "https://img2.baidu.com/it/u=1414537138,3276026308&fm=253&fmt=auto&app=120&f=JPEG?w=607&h=405",
    examine: 1,
  },
  {
    id: 6,
    title: "Title 3",
    imageUrl: "https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888",
    examine: 0,
  },
]

export default function MyTravelogList() {
  const [myTravelogList, setMyTravelogList] = useState(data)
  return (
    <div>
      {myTravelogList.map(item => {
        return <MyTravelogItem key={item.id} item={item} />
      })}
    </div>
  )
}
