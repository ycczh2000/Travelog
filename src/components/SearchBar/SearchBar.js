// src/components/SearchBar.js
import React from 'react';
import { SearchBar, Tag } from 'antd-mobile';
import './SearchBar.css';
import { LeftOutline } from 'antd-mobile-icons'
import LocalRecommendation from '../LocalRecommendation/LocalRecommendation';
// 模拟热搜词
const HotSearches = ["热搜词1", "热搜词2", "热搜词3"];

const SearchBarComponent = () => {
    return (
            <div className="search-bar-card">
                <div className="search-bar-header">
                    
                    <button className="transparent-button left-button"><LeftOutline />返回</button> {/* 返回按钮 */}
                    <SearchBar placeholder="搜索" className="search-bar-input" />
                    <button className="transparent-button right-button">搜索</button> {/* 搜索按钮 */}
                </div>
                <div className="hot-searches">
                    <div className="hot-searches-title">当前热搜：
                        <div className="hot-searches-tags">
                            {HotSearches.map((item, index) => (
                                <Tag className="hot-search-tag" key={index}>{item}</Tag>
                            ))}
                        </div>
                    </div>
                </div>
                <LocalRecommendation></LocalRecommendation>
            </div>

    );
};
export default SearchBarComponent;
