/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-09 22:10:51
 * @FilePath: \frontend\src\components\content\content.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';  
import { Rate,Card} from 'antd-mobile'
import './content.css'; 
  
const Content = ({tripInfo}) => { 
  console.log("content:",tripInfo)
  // const tripInfo ={
  //   tripWay: null,
  //   tripNum: null,
  //   tripDate: null,
  //   tripBudget: null,
  //   tripRate: 0,
  // };
  return (
    <div className="contentWrapper">
      <div className="headerRow">
        <div className="cell">出行天数</div>
        <div className="cell">出行费用</div>
        <div className="cell">出行方式</div>
        <div className="cell">出行人数</div>
      </div>
      <div className="dataRow">
        <div className="cell">{tripInfo && tripInfo.tripDate && tripInfo.tripDate.length > 0 ? tripInfo.tripDate : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripBudget && tripInfo.tripBudget.length > 0 ? tripInfo.tripBudget : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripWay && tripInfo.tripWay.length > 0 ? tripInfo.tripWay : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripNum && tripInfo.tripNum.length > 0 ? tripInfo.tripNum : '-'}</div>
      </div>
      <h4>旅行体验</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tripInfo && tripInfo.tripRate != undefined ? (
          <Rate allowHalf readOnly defaultValue={tripInfo.tripRate} />
        ) : (
          <p>该游记未提供评价</p>
        )}
      </div>
    </div>
  );
};
  
export default Content;