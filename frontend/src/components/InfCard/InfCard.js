/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-07 19:46:55
 * @FilePath: \frontend\src\components\InfCard\InfCard.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/InfCard.js
import React from 'react';
import { HeartOutline, HeartFill } from 'antd-mobile-icons';
import './InfCard.css';
import { useNavigate } from 'react-router-dom';

const InfCard = ({ id,city,imageUrl, title, username, likes, liked,avatarUrl }) => {
    const navigate = useNavigate();
    const cityString = Array.isArray(city) ? city.join(',') : '';
    const handleWatchDetail = () => {
      const queryString = new URLSearchParams({
        logID: id,
        // title: title,
        // content: content,
        city: cityString, // 使用cityString代替city.join(',')
        // tempTripInfo: JSON.stringify(tempTripInfo)
      }).toString();
  
      navigate(`/travelogs/${id}`);// 进行路由跳转，并传递参数,从信息流进入详细页只传递id
    //   navigate(`/detail/${title}`);
    };
    return (
        <div className="inf-card" onClick={handleWatchDetail}>
            <div className="inf-card-image-wrapper">
                <img src={imageUrl} alt={title} className="inf-card-image" />
            </div>
            <div className="inf-card-title">{title}</div>
            <div className="inf-card-user">
                <div className="inf-card-avatar-wrapper">
                    <img src={avatarUrl?avatarUrl:'https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712250000&t=4656932f5ea4aec126098e5189a99cef'} alt="Avatar" className="inf-card-avatar-image" />
                </div>
                <div className="inf-card-avatar">{username.substring(0, 6)}...</div>

                <div className="inf-card-likes">
                    {liked ? <HeartFill fontSize="18px" color="#FF0000" /> : <HeartOutline color='var(--adm-color-danger)' fontSize="18px" />}
                    {likes}
                </div>
            </div>
        </div>
    );
};


export default InfCard;
