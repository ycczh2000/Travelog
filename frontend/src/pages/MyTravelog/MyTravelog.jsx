import React from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
export default function MyTravelog() {
  return (
    <>
      <MyTravelogHeader />
      <MyTravelogFilter />
      <MyTravelogList />
    </>
  )
}
