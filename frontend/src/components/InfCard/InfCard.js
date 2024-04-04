// src/components/InfCard.js
import React from 'react';
import { HeartOutline, HeartFill } from 'antd-mobile-icons';
import './InfCard.css';

const InfCard = ({ imageUrl, title, username, likes, liked,avatarUrl }) => {
    return (
        <div className="inf-card">
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
