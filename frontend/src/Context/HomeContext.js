// HomeContext.js

import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [sorter, setSorter] = useState('0');
  const [city, setCity] = useState();
  const [selectedFilters, setSelectedFilters] = useState({
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: 0,
  });

  return (
    <HomeContext.Provider value={{ sorter, setSorter, city, setCity, selectedFilters, setSelectedFilters }}>
      {children}
    </HomeContext.Provider>
  );
};
