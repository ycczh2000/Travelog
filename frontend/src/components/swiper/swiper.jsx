/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 16:48:48
 * @FilePath: \frontend\src\components\swiper\swiper.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { Swiper } from 'antd-mobile';
import './Swiper.less';

const SwiperN = ({ bannerList }) => { // 使用解构赋值从传入的参数对象中获取 bannerList 属性
  const items = bannerList.map((item, index) => (
    <Swiper.Item key={index}>
      <img src={item} alt='' />
    </Swiper.Item>
  ));

  return (
    <Swiper
      loop
      autoplay
      className="banner-container"
      slideSize={70}
      trackOffset={15}
      stuckAtBoundary={false}
      allowTouchMove={true}
    >
      {items}
    </Swiper>
  );
}

export default SwiperN;