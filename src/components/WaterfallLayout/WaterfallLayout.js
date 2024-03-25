// src/components/WaterfallLayout.js
import React, { useRef, useEffect } from 'react';
import Masonry from 'masonry-layout';
import InfCard from '../InfCard/InfCard';
import './WaterfallLayout.css';

const WaterfallLayout = ({ data }) => {
    const masonryRef = useRef(null);

    useEffect(() => {
        if (masonryRef.current) {
            new Masonry(masonryRef.current, {
                itemSelector: '.waterfall-item',
                columnWidth: '.waterfall-sizer',
                gutter: '.waterfall-gutter',
                percentPosition: true,
                horizontalOrder: true
            });
        }
    }, []);

    return (
        <div ref={masonryRef} className="waterfall-layout">
            <div className="waterfall-sizer"></div>
            <div className="waterfall-gutter"></div>
            {data.map((item, index) => (
                <div key={index} className="waterfall-item">
                    <InfCard
                        imageUrl={item.imageUrl}
                        title={item.title}
                        username={item.username}
                        avatar={item.avatar}
                        likes={item.likes}
                    />
                </div>
            ))}
        </div>
    );
};

export default WaterfallLayout;
