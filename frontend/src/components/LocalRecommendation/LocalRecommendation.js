/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-24 17:45:39
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-09 23:43:35
 * @FilePath: \ultrawork\src\components\LocalRecommendation\LocalRecommendation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/LocalRecommendation.js
import React,{useContext} from 'react';
import './LocalRecommendation.css'; // 自定义样式
import { HomeContext } from "../../Context/HomeContext"
const LocalRecommendation = () => {
    const { searchTerm } = useContext(HomeContext);
    // 推荐数据模拟
    const recommendations = [
        {
            id: 1,
            title: "美食推荐",
            image: "https://img1.baidu.com/it/u=4101549484,174560294&fm=253&fmt=auto&app=120&f=JPEG?w=881&h=647",
            label: "火爆"
        },
        {
            id: 2,
            title: "景点推荐",
            image: "https://img1.baidu.com/it/u=4101549484,174560294&fm=253&fmt=auto&app=120&f=JPEG?w=881&h=647",
            label: "超值"
        },
        {
            id: 3,
            title: "购物推荐",
            image: "https://img0.baidu.com/it/u=2263858049,459404824&fm=253&fmt=auto&app=138&f=JPEG?w=607&h=420",
            label: "特价"
        },
        {
            id: 4,
            title: "购物推荐",
            image: "https://img0.baidu.com/it/u=2263858049,459404824&fm=253&fmt=auto&app=138&f=JPEG?w=607&h=420",
            label: "特价"
        }
    ];
    const hideStyle = searchTerm !== '' ? { visibility: 'hidden', height: 0 } : {margin:'10px'};

    return (
        <div className="local-recommendation-card">
                <div style={hideStyle}>
                    <div className="recommendation-header">为你推荐</div>
                    <div className="recommendation-images">
                        {recommendations.map((item) => (
                            <div key={item.id} className="recommendation-image-wrapper">
                                <img src={item.image} alt={item.title} className="recommendation-image" />
                                <div className="recommendation-label">{item.label}</div>
                                <div className="recommendation-title">{item.title}</div>
                            </div>
                        ))}
                        {/* 提示滑动到底部 */}
                        <div className="end-of-scroll">已经到底部啦</div>
                    </div>
                </div>
        </div>
    );
};

export default LocalRecommendation;
