import React from "react"
import { useState, useContext } from "react"
import { UserSpaceContent } from "../../UserSpaceContent"
import MyTravelogItem from "./MyTravelogItem"
import styles from "./MyTravelogList.module.scss"

export default function MyTravelogList(props) {
  const { filter, setFilter, sorter, setSorter } = useContext(UserSpaceContent)
  const { myTravelogList, deleteTravelog } = props
  console.log('myTravelogList:', myTravelogList)

  return (
    <div className={styles.MyTravelog}>
      {myTravelogList.map(item => {
        // 如果 filter 为 'all'，或者 item.status 与 filter 匹配，则渲染 MyTravelogItem
        if (filter === 'all' || item.status === filter) {
          return <MyTravelogItem key={item.id} item={item} deleteTravelog={deleteTravelog} />;
        }
        // 如果不符合筛选条件，则不渲染 MyTravelogItem
        return null;
      })}
    </div>

  )
}
