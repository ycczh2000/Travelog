/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:18:15
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-06 16:12:04
 * @FilePath: \frontend\src\pages\Detaillog\Detaillog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { LeftOutline } from 'antd-mobile-icons'
import { useLocation } from 'react-router-dom';
import SwiperN from '../../components/swiper/swiper';
import UserInfo from '../../components/UserInfo/UserInfo';
import Details from '../../components/Details/Details';
import Content from '../../components/content/content'
import Comment from '../../components/comment/comment'

const Detaillog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const logID = queryParams.get('logID');
  console.log("logID:", logID)
  // const title = queryParams.get('title');
  // const content = queryParams.get('content');
  // const city = queryParams.get('city')?.split(',');
  // const tripInfo = JSON.parse(queryParams.get('tempTripInfo'));

  const [title, setTitle] = useState(queryParams.get('title')||'游记标题');
  const [content, setContent] = useState(queryParams.get('content')||'游记内容');
  const [city, setCity] = useState( queryParams.get('city')?.split(',')||'');
  const [tripInfo, setTripInfo] = useState(JSON.parse(queryParams.get('tempTripInfo'))||{
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: null,
  });
  const [bannerList, setBannerList] = useState([
    'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
    'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
    'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',]);
  const [detailInfo, setDetailInfo] = useState({
    authorUID: '123456789',
    userAvatar: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
    userName: '用户名',
    lastEditTime: '2024-04-05 16:18:15',
  });
  const [commentInfo, setCommentInfo] = useState({
    comments: [
      {
        userName: '用户名A',
        content: '评论内容A',
      },
      {
        userName: '用户名B',
        content: '评论内容B',
      }
    ]
  });
  console.log('city:',city)
  useEffect(() => {
    const fetchData = async () => {
      
      // 如果 logID 不为空，则额外获取数据
      if (logID) {
        // 发送fetch请求，获取其他数据
        try {
          const response = await fetch(`api-log/${logID}`);//todo:获取游记数据
          const data = await response.json();
          // 设置获取到的数据
          setTitle(data.title);
          setContent(data.content);
          setCity(data.city.split(',')); // 假设城市数据是以逗号分隔的字符串
          setTripInfo(JSON.parse(data.tempTripInfo));
          setBannerList(data.bannerList);
          setDetailInfo(data.detailInfo);
          setCommentInfo(data.commentInfo);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // 调用数据获取函数
  }, []);
  const handleGoBack = () => {
    window.history.go(-1); // 返回上一页面
  };
  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      <button className="transparent-button left-button" onClick={handleGoBack} style={{
        margin: '1rem',
        marginLeft: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        color: 'rgba(0, 0, 0, 0.7)',
        letterSpacing: '0.05em',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
      }}>
        <LeftOutline />
      </button>
      <SwiperN bannerList={bannerList} />
      <UserInfo title={title} content={content} />
      <Details detailInfo={detailInfo} />
      <Content tripInfo={tripInfo} />
      <Comment commentInfo={commentInfo} />
    </div>
  );
};

export default Detaillog;
