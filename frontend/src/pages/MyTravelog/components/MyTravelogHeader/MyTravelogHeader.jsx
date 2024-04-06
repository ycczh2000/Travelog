import React from "react"
import { NavBar } from "antd-mobile"
import styles from "./MyTravelogHeader.module.scss"
export default function MyTravelogHeader() {
  return (
    <>
      <div className={styles.header}>
        <NavBar onBack={() => 0}>个人空间</NavBar>
      </div>
    </>
  )
}
