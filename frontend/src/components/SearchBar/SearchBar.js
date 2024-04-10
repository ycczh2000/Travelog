/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-10 15:06:11
 * @FilePath: \frontend\src\components\SearchBar\SearchBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/SearchBar.js
import React, { useContext, useState, useEffect } from 'react';
import { SearchBar, Tag, Cascader,Popup } from 'antd-mobile';
import './SearchBar.css';
import { LeftOutline } from 'antd-mobile-icons'
import LocalRecommendation from '../LocalRecommendation/LocalRecommendation';
import { HomeContext } from "../../Context/HomeContext"

// 模拟热搜词
const HotSearches = ["热搜词1", "热搜词2", "热搜词3"];
const searchArray = ['', '上海大学', '顾村公园', '钱伟长图书馆'];

const SearchBarComponent = () => {
    const { searchTerm, setSearchTerm, searchMode, setSearchMode } = useContext(HomeContext);
    console.log('searchMode:', searchMode)
    const [searchInput, setSearchInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [seacrchPageVisible, setSeacrchPageVisible] = useState(false);

    const options = [
        {
            label: '笔记',
            value: 'title',
        }, {
            label: '用户',
            value: 'user',
        }]
    const handleHotSearchClick = (item) => {
        setSearchTerm(item);
        setSearchInput(item);
    }
    const handleBack = () => {// 返回按钮事件,如果当前在搜索，则清除搜索词和搜索输入，否则返回上一页
        if (searchTerm !== '') {
            setSearchTerm('');
            setSearchInput('');
        }
        else {
            window.history.back();
        }
    }
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlaceholderIndex((prevIndex) =>
                prevIndex === searchArray.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 每5秒切换一次 placeholder

        return () => {
            clearInterval(intervalId); // 清除定时器
        };
    }, []);

    const handleClickSearchBar = () => {// 点击搜索框时，展开搜索页视图
        // console.log('点击搜索框')
        setSeacrchPageVisible(true)
    }

    const seacrchPage=()=>{
        return (
            <div className="search-page" style={{width:'100%',height:'80%', backgroundColor:'#fff',borderRadius:'10px'}}>
    
    
            </div>
        )
    }

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
                }}
                    onClick={handleBack}>
                    <LeftOutline /> {/* 返回按钮 */}
                </button>
                <button className="transparent-button left-button" style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    marginLeft: '0.06rem',
                    color: '#fff',
                    letterSpacing: '0.05em',
                }}
                    onClick={() => {
                        setVisible(true)
                    }}>
                    {searchMode === 'title' ? '笔记' : (searchMode === 'user' ? '用户' : '笔记')}
                </button>
                <Cascader
                    options={options}
                    visible={visible}
                    onClose={() => {
                        setVisible(false)
                    }}
                    // value={options}
                    onConfirm={(val) => {
                        setSearchMode(val[0])
                    }}
                    onSelect={(val, extend) => {
                        console.log('onSelect', val, extend.items)
                    }}
                />
                {/* 返回按钮 */}
                    <SearchBar
                        /* 由于react渲染机制问题，每次搜索框placeholder变化时，都会报出Warning: Encountered two children with the same key
                        这个警告暂时无法解决
                        如果需要解决这个问题，请将searchArray相关语句注释掉 */
                        onFocus={handleClickSearchBar}
                        key={placeholderIndex}
                        placeholder={searchArray[placeholderIndex]}
                        // placeholder='搜索'
                        className={`search-bar-input`}
                        maxLength={20}
                        value={searchInput}
                        onChange={(value) => {
                            setSearchInput(value)//只修改搜索输入，实际搜索词按搜索按钮后更新
                        }}
                        onClear={() => {
                            setSearchInput('');
                            setSearchTerm('');// 清除搜索词和搜索输入
                        }}
                        onSearch={(value) => {
                            if (value !== '') {
                                setSearchInput(value);
                                setSearchTerm(value); // 更新搜索词
                            } else {
                                setSearchInput(searchArray[placeholderIndex]);
                                setSearchTerm(searchArray[placeholderIndex]); // 清除搜索词和搜索输入
                            }
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
                        if (searchInput !== '') {
                            setSearchTerm(searchInput);
                        }
                        else {
                            setSearchTerm(searchArray[placeholderIndex]);
                            setSearchInput(searchArray[placeholderIndex]);
                        }
                        // console.log(searchTerm, searchInput);
                    }}
                >
                    搜索
                </button>{/* 搜索按钮 */}
            </div>
            <div className="hot-searches-container">
                {searchTerm === '' && ( // 使用条件语句判断是否显示热搜标签
                    <div className="hot-searches">
                        <div className="hot-searches-title">当前热搜：
                            <div className="hot-searches-tags">
                                {HotSearches.map((item, index) => (
                                    <Tag
                                        className="hot-search-tag"
                                        key={index}
                                        onClick={() => handleHotSearchClick(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <LocalRecommendation />
            </div>
            <Popup
              closeOnSwipe='true'
              visible={seacrchPageVisible}
              onMaskClick={() => {
                setSeacrchPageVisible(false)
              }}
              onClose={() => {
                setSeacrchPageVisible(false)
              }}
              bodyStyle={{ height: '40vh' }}
            >
              {seacrchPage}
            </Popup>
        </div>
    );
};
export default SearchBarComponent;
