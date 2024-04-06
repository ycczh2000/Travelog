/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-07 01:28:14
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-07 01:30:52
 * @FilePath: \frontend\src\Context\UserSpaceContent.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { createContext, useState } from 'react';

export const UserSpaceContent = createContext();

export const UserSpaceContentProvider = ({ children }) => {
    const [filter, setFilter] = useState("all")
    const [sorter, setSorter] = useState("new")

  return (
    <UserSpaceContent.Provider value={{ filter, setFilter, sorter, setSorter}}>
      {children}
    </UserSpaceContent.Provider>
  );
};