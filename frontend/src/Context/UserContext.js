/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-07 00:11:31
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-07 18:28:36
 * @FilePath: \frontend\src\Context\UserContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// UserContext.js

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [UID, setUID] = useState('');
  const [userName, setUserName] = useState('MOMO');

  // 在组件挂载时从缓存中读取初始值
  useEffect(() => {
    const cachedUID = localStorage.getItem('UID');
    const cachedUserName = localStorage.getItem('userName');

    if (cachedUID) {
      setUID(cachedUID);
    }
    if (cachedUserName) {
      setUserName(cachedUserName);
    }
  }, []); // 这里传入一个空数组作为依赖，确保 useEffect 只在组件挂载时执行一次

  // 将UID和userName保存到缓存
  useEffect(() => {
    localStorage.setItem('UID', UID);
    localStorage.setItem('userName', userName);
  }, [UID, userName]); // 这里传入 UID 和 userName 作为依赖，当它们发生变化时保存到缓存

  return (
    <UserContext.Provider value={{ UID, setUID, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
