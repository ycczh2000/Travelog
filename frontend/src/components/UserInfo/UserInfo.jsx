import React from 'react'
import "./UserInfo.css"

const UserInfo = ({ title, content, city }) => {
  const testcontent = '上海，中国共产党人的初心确立之地。1920年6月，中国共产党发起组在上海成立。1021年，中共一大在上海和嘉兴南湖召开，宣告中国共产党正式成立，中国革命的面目从此焕然一新；1922年，中共二大在上海召开，通过第一部党章，确定反帝反封建的民主革命纲领；1925年，中共四大在上海召开，及时提出无产阶级领导权和工农联盟，推动大革命走向高潮。毛泽东同志把上海比作“近代中国的光明的摇篮”，“是中国工人阶级的大本营和中国共产党的诞生地，在长时间期间它是中国革命运动的指导中心”。'
  return (
    <div className="contain1">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div style={{
        marginTop: '-20px',
        fontFamily: 'Arial, sans-serif',
        color: 'blue'
      }}>
        {city && city.length > 0 ? city.join(', ') : ''}
      </div>
      <div className="userInfo">
        {content}
        {/* {testcontent} */}
      </div>
    </div>
  )
}

export default UserInfo