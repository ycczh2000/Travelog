/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:18:15
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 23:18:57
 * @FilePath: \frontend\src\pages\Detaillog\Detaillog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';  
import SwiperN from '../../components/swiper/swiper';  
import UserInfo from '../../components/UserInfo/UserInfo';  
import Details from '../../components/Details/Details';  
import Content from '../../components/content/content'
import Comment from '../../components/comment/comment'

const Detaillog = () => {  
  const bannerList = [
    'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
    'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
    'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',];  
  const title = '游记标题';
  const content = '游记内容';
  const tripInfo ={
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: null,
  };
  const detailInfo = {
    authorUID: '123456789',
    userAvatar: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
    userName: '用户名',
    lastEditTime: '2024-04-05 16:18:15',
  }
  const commentInfo = {
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
  };
  
  return (  
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>  
      <SwiperN bannerList={bannerList}/>  
      <UserInfo title={title} content={content}/>  
      <Details detailInfo={detailInfo}/>  
      <Content tripInfo={tripInfo}/>
      <Comment commentInfo={commentInfo}/>
    </div>  
  );  
};  
  
export default Detaillog;
