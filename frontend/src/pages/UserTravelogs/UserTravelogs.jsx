import React from "react"
import { useParams } from "react-router-dom"

export default function UserTravelogs() {
  const { username } = useParams()
  return (
    <div>
      <h2>username {username} in UserTravelogs Component</h2>
    </div>
  )
}
