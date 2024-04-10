import React from "react"
import { useState, useContext,useEffect } from "react"
import { UserSpaceContent } from "../../UserSpaceContent"
import MyTravelogItem from "./MyTravelogItem"
import styles from "./MyTravelogList.module.scss"

export default function MyTravelogList(props) {
  const { filter, setFilter, sorter, setSorter } = useContext(UserSpaceContent)
  const { myTravelogList, deleteTravelog } = props
  console.log('myTravelogList:', myTravelogList)
  
  useEffect(() => {
    handleSort(sorter)
  }, [sorter]); 
  const handleSort = (sorter) => {
    const handleSort = (sorter) => {
      if (sorter === 'examine') {
          // 按照 auditDate 字段从新到旧排序
          myTravelogList.sort((a, b) => {
              return new Date(a.auditDate) - new Date(b.auditDate);
          });
      } else {
          // 按照 uploadDate 字段从新到旧排序
          myTravelogList.sort((a, b) => {
              return new Date(a.uploadDate) - new Date(b.uploadDate);
          });
      }
  };
  
  }
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
