// src/components/SearchBar.js
import React, { useContext, useState } from 'react';
import { SearchBar, Tag } from 'antd-mobile';
import './SearchBar.css';
import { LeftOutline } from 'antd-mobile-icons'
import LocalRecommendation from '../LocalRecommendation/LocalRecommendation';
import { HomeContext } from "../../Context/HomeContext"

// 模拟热搜词
const HotSearches = ["热搜词1", "热搜词2", "热搜词3"];

const SearchBarComponent = () => {
    const { searchTerm, setSearchTerm } = useContext(HomeContext);
    const [searchInput, setSearchInput] = useState('');
    return (
        <div className="search-bar-card" style={{
            backgroundImage: 'url(https://x0.ifengimg.com/res/2022/F3337B046CC16EEB79E2805025B253FE05493DC0_size395_w1280_h867.jpeg), linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
            /* 背景图片路径 */
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // filter: 'blur(5px) brightness(0.7)', /* 添加毛玻璃特效 */
        }}>
            <div className="search-bar-header">

                <button className="transparent-button left-button" style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    marginLeft: '0.06rem',
                    color: '#fff',
                    letterSpacing: '0.05em',
                }}>
                    <LeftOutline /> 返回
                </button>
                {/* 返回按钮 */}
                <SearchBar
                    placeholder="搜索"
                    className="search-bar-input"
                    maxLength={20}
                    value={searchInput}
                    onChange={(value) => {
                        setSearchInput(value)//只修改搜索输入，实际搜索词按搜索按钮后更新
                        // console.log(searchInput, searchTerm)
                    }}
                    onClear={() => {
                        setSearchInput('');
                        setSearchTerm('');// 清除搜索词和搜索输入
                        // console.log(searchInput, searchTerm)
                    }}
                />

                <button
                    className="transparent-button right-button"
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif',
                        marginLeft: '0.06rem',
                        color: '#fff',
                        letterSpacing: '0.05em',
                    }}
                    onClick={() => {
                        setSearchTerm(searchInput);//将搜索词传递给HomeContext
                        // console.log(searchTerm, searchInput);
                    }}
                >
                    搜索
                </button>{/* 搜索按钮 */}
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
