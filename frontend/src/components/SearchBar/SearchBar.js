/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-19 07:50:03
 * @FilePath: \frontend\src\components\SearchBar\SearchBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/SearchBar.js
import React, { useContext, useState, useEffect } from 'react';
import { SearchBar, Tag, Cascader, Popup, Button, List, Toast } from 'antd-mobile';
import './SearchBar.css';
import { LeftOutline, FireFill } from 'antd-mobile-icons'
import LocalRecommendation from '../LocalRecommendation/LocalRecommendation';
import { HomeContext } from "../../Context/HomeContext"
import { HotSearches, searchArray, hotSearchWords, fireSearchWords, hotTravelogs } from '../../config/mockData'
import { maliciousPattern } from '../../config/config'

const SearchBarComponent = () => {
    const { searchTerm, setSearchTerm, searchMode, setSearchMode, visible, setVisible,
        modevisible, setModeVisible, seacrchPageVisible, setSeacrchPageVisible } = useContext(HomeContext);
    console.log('searchMode:', searchMode)
    const [searchInput, setSearchInput] = useState('');

    const options = [
        {
            label: '笔记',
            value: 'title',
        }, {
            label: '用户',
            value: 'user',
        }]
    const handleHotSearchClick = (item) => {
        if (maliciousPattern.test(item)) {
            // 发现恶意代码
            console.log("输入包含恶意代码！");
            Toast.show({
                icon: 'fail',
                content: '输入包含恶意代码',
            })
        } else {
            // 未发现恶意代码
            setSearchTerm(item);
            setSearchInput(item);
            setSeacrchPageVisible(false);
            // 执行正常的查询操作
        }

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
            clearInterval(intervalId);
        };
    }, []);

    const handleClickSearchBar = () => {// 点击搜索框时，展开搜索页视图
        setVisible(false)
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
                    whiteSpace: 'nowrap'
                }}
                    onClick={() => {
                        setModeVisible(true)
                    }}>
                    {searchMode === 'title' ? '笔记' : (searchMode === 'user' ? '用户' : '笔记')}
                </button>
                <Cascader
                    options={options}
                    visible={modevisible}
                    onClose={() => {
                        setModeVisible(false)
                    }}
                    // value={options}
                    onConfirm={(val) => {
                        setSearchMode(val[0])
                    }}
                    onSelect={(val, extend) => {
                        console.log('onSelect', val, extend.items)
                    }}
                />{/* 分享按钮 */}

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
                        setSeacrchPageVisible(false);
                    }}
                    onSearch={(value) => {
                        if (value !== '') {
                            setSearchInput(value);
                            setSearchTerm(value); // 更新搜索词
                            setSeacrchPageVisible(false);
                        } else {
                            setSearchInput(searchArray[placeholderIndex]);
                            setSearchTerm(searchArray[placeholderIndex]);
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
                        whiteSpace: 'nowrap'
                    }}
                    onClick={() => {
                        if (searchInput !== '') {
                            if (maliciousPattern.test(searchInput)) {
                                // 发现恶意代码
                                console.log("输入包含恶意代码！");
                                Toast.show({
                                    icon: 'fail',
                                    content: '输入包含恶意代码',
                                })
                            }
                            else { setSearchTerm(searchInput); }
                        }
                        else {
                            if (maliciousPattern.test(searchArray[placeholderIndex])) {
                                // 发现恶意代码
                                console.log("输入包含恶意代码！");
                                Toast.show({
                                    icon: 'fail',
                                    content: '输入包含恶意代码',
                                })
                            } else {
                                setSearchTerm(searchArray[placeholderIndex]);
                                setSearchInput(searchArray[placeholderIndex]);
                            }
                        }
                    }}
                >
                    搜索
                </button>{/* 搜索按钮 */}
            </div>
            <div className="hot-searches-container">
                {searchTerm === '' && ( // 判断是否显示热搜标签(当处于搜索状态时，隐藏热搜标签)
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
                                    backgroundColor: "#F8E8EE", color: "red", borderRadius: "20px", margin: "5px",
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
                                    backgroundColor: "#F9F5F6", color: "black", borderRadius: "20px", margin: "5px",
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
                        {/* 排行榜内容 */}
                        <List header='旅行笔记热搜排行榜'>
                            {hotTravelogs.map((travelog, index) => (
                                <List.Item key={travelog.id} style={{ fontSize: '14px' }} onClick={() => {
                                    window.location.href = `/travelogs/${travelog.id}`
                                }}>
                                    {index + 1}:
                                    {index < 3 && <FireFill color='var(--adm-color-danger)' />} {/* 添加额外图标 */}
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
