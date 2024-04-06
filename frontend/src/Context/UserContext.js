/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-07 00:11:31
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-07 00:12:45
 * @FilePath: \frontend\src\Context\UserContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// UserContext.js

import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorter, setSorter] = useState('0');
  const [city, setCity] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: 0,
  });

  return (
    <HomeContext.Provider value={{ sorter, setSorter, city, setCity, selectedFilters, setSelectedFilters,searchTerm, setSearchTerm }}>
      {children}
    </HomeContext.Provider>
  );
};
