/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 22:04:34
 * @FilePath: \Travelog\frontend\src\pages\Home\Home.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/pages/Home.js
import React,{useEffect, useState} from 'react';
import SearchBarComponent from '../../components/SearchBar/SearchBar';
import LocalRecommendation from '../../components/LocalRecommendation/LocalRecommendation';
import FilterBar from '../../components/FilterBar/FilterBar';
import WaterfallLayout from '../../components/WaterfallLayout/WaterfallLayout';
import { FloatingBubble,Dialog } from 'antd-mobile'
import { IoMdRocket } from "react-icons/io";
const Home = () => {
  const [data, setData] = useState([    { id: 1, title: 'Title 1', imageUrl: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', username: 'User1', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 10 },
  { id: 2, title: 'Title 2', imageUrl: 'https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392', username: 'User2', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 20 },
  {id: 3, title: 'Title 3', imageUrl: 'https://img0.baidu.com/it/u=3009050874,651816433&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=392', username: 'User2', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 20 },
  {id: 3, title: 'Title 3', imageUrl: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', username: 'User2', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 20 },
  {id: 3, title: 'Title 3', imageUrl: 'https://img2.baidu.com/it/u=1414537138,3276026308&fm=253&fmt=auto&app=120&f=JPEG?w=607&h=405', username: 'User2', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 20 },
  {id: 3, title: 'Title 3', imageUrl: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', username: 'User2', avatar: 'https://img1.baidu.com/it/u=3443199485,2034708398&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888', likes: 20 },
  ]);

  const [loading, setLoading] = useState(false); // 新增 loading 状态

  useEffect(() => {
    fetchData();
  }, []); // 在组件加载时发送请求获取数据

  const fetchData = () => {
    // 如果正在加载数据，则直接返回，避免重复请求
    if (loading) return;

    setLoading(true); // 设置 loading 为 true，表示正在加载数据

    // 发送 GET 请求获取数据
    fetch('./testHome.json')
      .then(response => response.json())
      .then(newData => {
        setData(prevData => [...prevData, ...newData]); // 将新数据添加到已有数据后面
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        setLoading(false); // 请求完成后，设置 loading 为 false
      });
  };

  const handleScroll = () => {
    // 当滚动到页面底部时，并且当前不处于加载数据状态时，触发 fetchData 函数获取更多数据
    if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // 在组件加载时添加滚动事件监听器，并在组件卸载时移除监听器

  const handleUp = () => {
    // 点击后滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动
    });
  };

  return (
    <div>
      <SearchBarComponent />
      {/* <LocalRecommendation/> */}
      <FilterBar />
      <WaterfallLayout data={data} />
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          '--edge-distance': '24px',
          '--background': 'rgba(255, 255, 255, 0.8)', // 设置半透明的白色背景
        }}
        onClick={handleUp}
      >
        <IoMdRocket  color='black' fontSize={32} />
      </FloatingBubble>
    </div>
  );
};

export default Home;
