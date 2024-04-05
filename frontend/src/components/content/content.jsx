/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 23:09:04
 * @FilePath: \frontend\src\components\content\content.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';  
import { Rate, Space, Toast } from 'antd-mobile'
import './content.css'; 
  
const Content = ({tripInfo}) => { 
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
        <div className="cell">{tripInfo && tripInfo.tripDays && tripInfo.tripDays.length > 0 ? tripInfo.tripDays : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripCost && tripInfo.tripCost.length > 0 ? tripInfo.tripCost : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripMode && tripInfo.tripMode.length > 0 ? tripInfo.tripMode : '-'}</div>
        <div className="cell">{tripInfo && tripInfo.tripPersons && tripInfo.tripPersons.length > 0 ? tripInfo.tripPersons : '-'}</div>
      </div>
      <h4>旅行体验</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tripInfo && tripInfo.tripRate != undefined ? (
          <Rate allowHalf defaultValue={tripInfo.tripRate} />
        ) : (
          <p>该游记未提供评价</p>
        )}
      </div>
    </div>
  );
};
  
export default Content;