/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-03 08:25:10
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-10 14:53:40
 * @FilePath: \frontend\src\ConditionalFooter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useLocation } from "react-router";
import Footer from "./components/Footer/Footer";
import React from 'react';

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterOnPaths = ["/", "/register", "/publish", "/login", "/publish/", "/travelogs"];

  // 添加正则表达式以确保形如 /update/66114c55bfe46e3f74f02646 的路径也不显示 Footer
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname) || 
                          location.pathname.match(/^\/travelogs\/[^/]+$/) ||
                          location.pathname.match(/^\/update\/[a-f\d]{24}$/); // 匹配形如 /update/66114c55bfe46e3f74f02646

  return shouldHideFooter ? null : <Footer />;
}

export default ConditionalFooter;

