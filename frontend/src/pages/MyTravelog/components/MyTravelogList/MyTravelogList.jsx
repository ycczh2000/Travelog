import React from "react"
import { useState } from "react"

import MyTravelogItem from "./MyTravelogItem"
import styles from "./MyTravelogList.module.scss"

export default function MyTravelogList(props) {
  const { myTravelogList } = props

  return (
    <div className={styles.MyTravelog}>
      {myTravelogList.map(item => {
        return <MyTravelogItem key={item.id} item={item} />
      })}
    </div>
  )
}
