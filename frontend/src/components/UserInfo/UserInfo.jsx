import React from 'react'
import "./UserInfo.css"

const UserInfo = ({title,content}) => {
  return (
    <div className="contain1">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="userInfo">
        {content}
      </div>
    </div>
  )
}

export default UserInfo