// src/components/InfCard.js
import React from 'react';
import { HeartOutline, HeartFill } from 'antd-mobile-icons';
import './InfCard.css';

const InfCard = ({ imageUrl, title, username, likes, liked }) => {
    return (
        <div className="inf-card">
            <div className="inf-card-image-wrapper">
                <img src={imageUrl} alt={title} className="inf-card-image" />
            </div>
            <div className="inf-card-title">{title}</div>
            <div className="inf-card-user">
                <div className="inf-card-avatar">{username.substring(0, 6)}...</div>
                <div className="inf-card-likes">
                    {liked ? <HeartFill fontSize="18px" color="#FF0000" /> : <HeartOutline fontSize="18px" />}
                    {likes}
                </div>
            </div>
        </div>
    );
};

export default InfCard;
