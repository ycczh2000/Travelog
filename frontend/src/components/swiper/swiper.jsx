/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-18 21:58:59
 * @FilePath: \frontend\src\components\swiper\swiper.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{useState} from 'react';
import { Swiper,Popup } from 'antd-mobile';
import './Swiper.less';

const SwiperN = ({ bannerList }) => { // 使用解构赋值从传入的参数对象中获取 bannerList 属性
  const [visible, setVisible] = useState(false)
  const [imgindex, setImgindex] = useState(0)
  const items = bannerList.map((item, index) => (
    <Swiper.Item key={index}>
 <div style={{ width: '98%', height: '40vh', overflow: 'hidden' }} onClick={() => { setVisible(true); setImgindex(index); }}>
      <img src={item} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    </Swiper.Item>
  ));
  const handleCloseImg = () => {
    setVisible(false);
  }
  return (
    <div style={{ maxHeight: '20%' }}>
      <Swiper
        loop
        autoplay
      >
        {items}
      </Swiper>
      <Popup
              showCloseButton
              visible={visible}
              onMaskClick={() => {
                setVisible(false)
              }}
              bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '60vh',
              }}
            >
              <img src={bannerList[imgindex]} alt=''  onClick={handleCloseImg} style={{overflowY: 'scroll', width: '100%', height: '100%', objectFit: 'cover' }} />
            </Popup>
    </div>
  );
}

export default SwiperN;