/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-04 16:54:11
 * @FilePath: \frontend\src\components\WaterfallLayout\WaterfallLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/WaterfallLayout.js
import React, { useRef, useEffect, useState } from 'react';
import { InfiniteScroll } from 'antd-mobile';
import Masonry from 'masonry-layout';
import InfCard from '../InfCard/InfCard';
import './WaterfallLayout.css';
const WaterfallLayout = () => {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false); // 新增 loading 状态

    useEffect(() => {
        fetchData();
    }, []); // 在组件加载时发送请求获取数据

    const fetchData = () => {
        console.log('fetchData');
        // 如果正在加载数据，则直接返回，避免重复请求
        if (loading) return;

        setLoading(true); // 设置 loading 为 true，表示正在加载数据

        // 发送 GET 请求获取数据
        fetch(process.env.PUBLIC_URL + '/testHome.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(newData => {
                setData(prevData => [...prevData, ...newData]); // 将新数据添加到已有数据后面
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                setLoading(false); // 请求完成后，设置 loading 为 false
            });
    };

    const handleScroll = () => {
        // 当滚动到页面底部时，并且当前不处于加载数据状态时，触发 fetchData 函数获取更多数据
        if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            fetchData();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // 在组件加载时添加滚动事件监听器，并在组件卸载时移除监听器
    const masonryRef = useRef(null);

    useEffect(() => {
        if (masonryRef.current) {
            const masonry = new Masonry(masonryRef.current, {
                itemSelector: '.waterfall-item',
                columnWidth: '.waterfall-sizer',
                gutter: '.waterfall-gutter',
                percentPosition: true,
                horizontalOrder: true
            });

            // 更新瀑布流布局
            masonry.layout();
        }
    }, [data]); // 在 data 发生变化时重新计算瀑布流布局

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