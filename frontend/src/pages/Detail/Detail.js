import React, { useRef } from 'react';
import { Swiper } from 'antd-mobile';

const bannerList = [
  'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
  'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
  'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',
];

const items = bannerList.map((item, index) => (
  <Swiper.Item key={index}>
    <img src={item} alt='' />
  </Swiper.Item>
));

const BannerWithUserInfo = () => {
  return (
    <div>
      <Swiper loop autoplay>
        {items}
      </Swiper>
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <h2>商品信息</h2>
        <p>这里可以放一些商品相关信息，比如价格、描述等。</p>
      </div>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <img src="https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888" alt="User Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
        <div>
          <h3>User's Nickname</h3>
          <p>日期：2024-03-27</p>
        </div>
      </div>
      <div style={{ padding: '20px', background: '#fff' }}>
        <h2>用户评论</h2>
        {/* 在这里添加评论内容，可以使用普通的HTML元素和样式 */}
        <div>
          <p>用户A：这个商品很棒！</p>
          <p>用户B：我也觉得很不错。</p>
          {/* 可以继续添加其他评论内容 */}
        </div>
      </div>
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <h2>详细内容</h2>
        <p>在这里添加商品的详细描述、规格、使用方法等内容。</p>
      </div>
    </div>
  );
};

export default BannerWithUserInfo;