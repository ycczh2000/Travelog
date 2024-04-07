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

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [UID, setUID] = useState('');//用于本地追踪UID
  const [userName, setUserName] = useState('MOMO');

  return (
    <UserContext.Provider value={{UID, setUID, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
