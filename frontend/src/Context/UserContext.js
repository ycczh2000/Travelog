/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-07 00:11:31
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 21:35:25
 * @FilePath: \frontend\src\Context\UserContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// UserContext.js

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [UID, setUID] = useState('');
  const [userName, setUserName] = useState('');
  const [likedList, setLikedList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [historyList, setHistoryList] = useState([]);// TODO历史记录状态(未完成功能)

  useEffect(() => {
    const cachedUID = localStorage.getItem('UID');
    const cachedUserName = localStorage.getItem('userName');
    const cachedLikedList = localStorage.getItem('likedList');
    const cachedFollowingList = localStorage.getItem('followingList');
    const cachedHistoryList = localStorage.getItem('historyList');
    if (cachedUID) {
      console.log('从缓存中读取UID:', cachedUID);
      setUID(cachedUID);
    }
    if (cachedUserName) {
      console.log('从缓存中读取userName:', cachedUserName);
      setUserName(cachedUserName);
    }
    if (cachedLikedList) {
      setLikedList(cachedLikedList);
    }
    if (cachedFollowingList) {
      setFollowingList(cachedFollowingList);
    }
    if (cachedHistoryList) {
      setHistoryList(cachedHistoryList);
    }
  }, []);

  // 将UID和userName保存到缓存
  useEffect(() => {
    localStorage.setItem('UID', UID);
    localStorage.setItem('userName', userName);
  }, [UID, userName]);

  return (
    <UserContext.Provider value={{ UID, setUID, userName, setUserName}}>
      {children}
    </UserContext.Provider>
  );
};
