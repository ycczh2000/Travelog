/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-10 20:24:50
 * @FilePath: \frontend\src\components\SearchBar\SearchBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/SearchBar.js
import React, { useContext, useState, useEffect } from 'react';
import { SearchBar, Tag, Cascader, Popup, Button, List } from 'antd-mobile';
import './SearchBar.css';
import { LeftOutline, FireFill } from 'antd-mobile-icons'
import LocalRecommendation from '../LocalRecommendation/LocalRecommendation';
import { HomeContext } from "../../Context/HomeContext"

// 模拟热搜词
const HotSearches = ["热搜词1", "热搜词2", "热搜词3"];
const searchArray = ['', '上海大学', '顾村公园', '钱伟长图书馆'];
const hotSearchWords = ['热搜词1', '热搜词2', '热搜词3', '热搜词4', '热搜词5', '热搜词6', '热搜词7', '热搜词8'];
const fireSearchWords = ['上海大学', '顾村公园'];
const hotTravelogs = [{ title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
{ title: '3小时速通上海大学', id: '661556cfa9879f1482323604' }, { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' },
{ title: '3小时速通上海大学', id: '661556cfa9879f1482323604' }, { title: '3小时速通上海大学', id: '661556cfa9879f1482323604' }]


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
        setSeacrchPageVisible(false);
    }
    const handleBack = () => {// 返回按钮事件,如果当前在搜索，则清除搜索词和搜索输入，否则返回上一页
        if (searchTerm !== '' || seacrchPageVisible) {
            setSeacrchPageVisible(false)
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
    useEffect(() => {
        setSeacrchPageVisible(false);
    }, [searchTerm]);

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
                    whiteSpace: 'nowrap'//禁止换行
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
                    // onBlur={() => {
                    //     setSeacrchPageVisible(false);   
                    // }}
                    onClear={() => {
                        setSearchInput('');
                        setSearchTerm('');// 清除搜索词和搜索输入
                        setSeacrchPageVisible(false);
                    }}
                    onSearch={(value) => {
                        if (value !== '') {
                            setSearchInput(value);
                            setSearchTerm(value); // 更新搜索词
                            setSeacrchPageVisible(false);
                        } else {
                            setSearchInput(searchArray[placeholderIndex]);
                            setSearchTerm(searchArray[placeholderIndex]); // 清除搜索词和搜索输入
                            setSeacrchPageVisible(false);
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
                        whiteSpace: 'nowrap'//禁止换行 
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
                                        style={{
                                            backgroundColor: 'A79277',
                                            color: 'white',
                                            borderRadius: '20px',
                                            margin: '5px'
                                        }}
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
                forceRender={true}
                mask={false}
                closeOnSwipe={true}
                visible={seacrchPageVisible}
                onMaskClick={() => {
                    setSeacrchPageVisible(false)
                }}
                onClose={() => {
                    setSeacrchPageVisible(false)
                }}
                bodyStyle={{ height: '90vh' }}
            >
                <div className="search-page" style={{ padding: '20px' }}>
                    <h2 style={{ marginBottom: '20px', fontWeight: 'bold' }}>大家都在搜</h2>
                    <div className="hot-search-words" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                        zIndex: 999
                    }}>
                        {fireSearchWords.map((word, index) => (
                            <Button
                                onClick={() => {
                                    setSearchInput(word);
                                    setSearchTerm(word);
                                    setSeacrchPageVisible(false);
                                }
                                }
                                key={index}
                                style={{
                                    backgroundColor: "#FDCEDF", color: "red", borderRadius: "20px", margin: "5px",
                                    fontSize: "16px", padding: "5px 10px", border: "none", fontFamily: "Cursive, Arial, sans-serif",
                                    letterSpacing: "1px"
                                }}
                            >
                                <FireFill />{word}
                            </Button>
                        ))}
                        {hotSearchWords.map((word, index) => (
                            <Button
                            onClick={() => {
                                setSearchInput(word);
                                setSearchTerm(word);
                                setSeacrchPageVisible(false);
                            }
                            }
                                key={index}
                                style={{
                                    backgroundColor: "lightgray", color: "black", borderRadius: "20px", margin: "5px",
                                    fontSize: "16px", padding: "5px 10px", border: "none", fontFamily: "Cursive, Arial, sans-serif",
                                    letterSpacing: "1px"
                                }}
                            >
                                {word}
                            </Button>
                        ))}
                    </div>
                    <hr style={{ margin: '20px 0' }} />
                    <div className="ranking">
                        {/* 这里是排行榜内容 */}
                        <List header='旅行笔记热搜排行榜'>
                            {hotTravelogs.map((travelog, index) => (
                                <List.Item key={travelog.id} style={{fontSize:'14px'}} onClick={() => {
                                    window.location.href = `/travelogs/${travelog.id}`
                                }}>
                                    {index+1}:
                                    {index < 3 && <FireFill color='var(--adm-color-danger)'/>} {/* 添加额外图标 */}
                                    {travelog.title}
                                </List.Item>
                            ))}
                        </List>
                    </div>
                </div>

                {/* <hotSearchPage/> */}
            </Popup>
        </div>
    );
};
export default SearchBarComponent;
