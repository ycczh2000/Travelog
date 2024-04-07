/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-06 20:33:25
 * @FilePath: \Travelog\frontend\src\pages\Home\Home.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/pages/Home.js
import React, { createContext, useEffect, useState } from 'react';
import SearchBarComponent from '../../components/SearchBar/SearchBar';
import LocalRecommendation from '../../components/LocalRecommendation/LocalRecommendation';
import FilterBar from '../../components/FilterBar/FilterBar';
import WaterfallLayout from '../../components/WaterfallLayout/WaterfallLayout';
import { FloatingBubble, Dialog } from 'antd-mobile'
import { IoMdRocket } from "react-icons/io";
import {HomeContextProvider} from "../../Context/HomeContext"

const Home = () => {
  const handleUp = () => {
    // 点击后滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动
    });
  };
  // const [sorter, setSorter] = useState('0');//首页相关使用到的数据，已改为使用上下文实现
  // const [city, setCity] = useState()
  // const [selectedFilters, setSelectedFilters] = useState({
  //   tripWay: null,
  //   tripNum: null,
  //   tripDate: null,
  //   tripBudget: null,
  //   tripRate: 0,
  // });
  return (
    <div>
        <SearchBarComponent />
        {/* <LocalRecommendation/> */}
        <FilterBar />
        <WaterfallLayout/>
        <FloatingBubble
          style={{
            '--initial-position-bottom': '100px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
            '--background': 'rgba(255, 255, 255, 0.8)', // 设置半透明的白色背景
          }}
          onClick={handleUp}
        >
          <IoMdRocket color='black' fontSize={32} />
        </FloatingBubble>
    </div>
  );
};

export default Home;
