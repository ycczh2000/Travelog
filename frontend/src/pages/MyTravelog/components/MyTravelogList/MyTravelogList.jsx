import React from "react"
import { useState, useContext } from "react"
import { UserSpaceContent } from "../../UserSpaceContent"
import MyTravelogItem from "./MyTravelogItem"
import styles from "./MyTravelogList.module.scss"

export default function MyTravelogList(props) {
  const { filter, setFilter, sorter, setSorter } = useContext(UserSpaceContent)
  const { myTravelogList, deleteTravelog } = props

  return (
    <div className={styles.MyTravelog}>
      {myTravelogList.map(item => {
        return <MyTravelogItem key={item.id} item={item} deleteTravelog={deleteTravelog} />
      })}
    </div>
  )
}
