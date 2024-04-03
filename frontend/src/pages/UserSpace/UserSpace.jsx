import React from "react"
import { Outlet, useParams } from "react-router-dom"
export default function Space() {
  const { username } = useParams()
  return (
    <div>
      <h1>username {username} in UserSpace Component</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
