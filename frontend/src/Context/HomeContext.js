/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-04 20:33:27
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 15:32:14
 * @FilePath: \frontend\src\Context\HomeContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// HomeContext.js

import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('title');
  const [sorter, setSorter] = useState('0');
  const [city, setCity] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: 0,
  });
  const [visible, setVisible] = useState(false)//首页fitlerBar筛选页是否显示
  const [modevisible, setModeVisible] = useState(false);//选择搜索模式
  const [seacrchPageVisible, setSeacrchPageVisible] = useState(false);//搜索页
  return (
    <HomeContext.Provider value={{ sorter, setSorter, city, setCity, selectedFilters, 
    setSelectedFilters,searchTerm, setSearchTerm,searchMode, setSearchMode,
    visible, setVisible ,modevisible, setModeVisible,seacrchPageVisible, setSeacrchPageVisible
    }}>
      {children}
    </HomeContext.Provider>
  );
};
