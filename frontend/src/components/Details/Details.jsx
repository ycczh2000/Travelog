/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 23:15:10
 * @FilePath: \frontend\src\components\Details\Details.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';  
import { Button } from 'antd-mobile'
import  "./Details.css"

const Details = ({detailInfo}) => {  
  return (  
      <div className="contain2">
        <img className="imager" src={detailInfo.userAvatar} alt="用户头像" />
        <div className="info">
          <h3>{detailInfo.userName}</h3>
          <p>最后编辑日期:{detailInfo.lastEditTime?detailInfo.lastEditTime:'未知'}</p>
        </div>
        <Button className="button1" color='primary'>关注</Button>
      </div>

  );  
};  
  
export default Details;