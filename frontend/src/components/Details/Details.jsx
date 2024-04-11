/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-10 02:10:12
 * @FilePath: \frontend\src\components\Details\Details.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext } from 'react';
import { Button, Toast } from 'antd-mobile'
import "./Details.css"
import { UserContext } from "../../Context/UserContext"

const Details = ({ detailInfo }) => {
  const [followed, setFollowed] = React.useState(false);
  const { userName } = useContext(UserContext)//自己账户的用户名
  // console.log('detailInfo:',detailInfo)
  const handleFollowed = () => {
    if (userName === detailInfo.username) {
      Toast.show({
        icon: 'fail',
        content: '不能关注自己',
      })
      return
    }
    if (followed) {
      // 如果已经关注，则取消关注
      setFollowed(false);
      const cachedFollowingList = JSON.parse(localStorage.getItem('cachedFollowingList'));
      if (cachedFollowingList) {
        // 找到相同用户名处，并删除该项
        const updatedList = cachedFollowingList.filter(username => username !== detailInfo.username);
        localStorage.setItem('cachedFollowingList', JSON.stringify(updatedList));
        // 向后端发送取消关注的请求
        Toast.show({
          icon: 'success',
          content: '取消关注成功',
        })
      }
    } else {
      // 如果尚未关注，则关注
      setFollowed(true);
      const cachedFollowingList = JSON.parse(localStorage.getItem('cachedFollowingList')) || [];
      // 将用户名添加到 cachedFollowingList 中
      localStorage.setItem('cachedFollowingList', JSON.stringify([...cachedFollowingList, detailInfo.username]));
      // 向后端发送关注的请求
      Toast.show({
        icon: 'success',
        content: '关注成功',
      })
    };

  }
  return (
    <div className="contain2">
      <img className="imager" src={`http://localhost:8000/getAvatar/${detailInfo.username}`} alt="用户头像" />
      <div className="info">
        <h3>{detailInfo.username}</h3>
        <p>笔记创建日期:{detailInfo.lastEditTime ? detailInfo.lastEditTime : '未知'}</p>
      </div>
      <Button
        className="button1"
        color={userName === detailInfo.username ? 'danger' : (followed ? 'primary' : 'primary')}
        fill={userName === detailInfo.username ? 'outline' : (followed ? 'outline' : 'solid')}
        onClick={handleFollowed}
        style={{ width: '80px' }}
      >
        {userName === detailInfo.username ? '自己' : (followed ? '已关注' : '关注')}
      </Button>
    </div>
  );
};

export default Details;