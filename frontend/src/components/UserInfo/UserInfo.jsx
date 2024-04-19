import React from 'react'
import "./UserInfo.css"

const UserInfo = ({ title, content, city }) => {
  return (
    <div className="contain1">
      <div className="title">
        <h2 style={{marginTop:'0'}}>{title}</h2>
      </div>
      <div style={{
        marginTop: '-20px',
        fontFamily: 'Arial, sans-serif',
        color: 'blue'
      }}>
        {city && city.length > 0 ? city.join(', ') : ''}
      </div>
      <div className="userInfo" style={{ whiteSpace: 'pre-line' }}>
        {content}
        {/* {testcontent} */}
      </div>
    </div>
  )
}

export default UserInfo