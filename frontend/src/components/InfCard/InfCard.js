/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-10 01:11:51
 * @FilePath: \frontend\src\components\InfCard\InfCard.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/InfCard.js
import React,{useEffect} from 'react';
import { HeartOutline, HeartFill } from 'antd-mobile-icons';
import './InfCard.css';
import { useNavigate } from 'react-router-dom';

const InfCard = ({ id, imageUrl, title, username, likesCount, avatarUrl }) => {
    const navigate = useNavigate();
    const handleWatchDetail = () => {
        navigate(`/travelogs/${id}`);// 进行路由跳转，并传递参数,从信息流进入详细页只传递id
    };
    const [likes, setLikes] = React.useState(likesCount);//本地显示的点赞数,仅用于本组件的渲染
    const [liked, setLiked]=React.useState(false);
    useEffect(() => {
        // 检查 localStorage 中是否存在为 {id} 的值
        let cachedLikedList = JSON.parse(localStorage.getItem('cachedLikedList'));
        if (!cachedLikedList) {
          // 如果缓存列表不存在，则创建一个空数组并保存到 localStorage 中
          cachedLikedList = [];
          localStorage.setItem('cachedLikedList', JSON.stringify(cachedLikedList));
        } else if (cachedLikedList.includes(id)) {
          // 如果缓存列表存在，并且包含当前 id，则设置 liked 为 true
          setLiked(true);
        }
      }, [id]); // 当 id 发生变化时重新执行 useEffect      

      const handleLiked = (event) => {
        event.stopPropagation();// 阻止事件冒泡，防止触发父组件的 onClick,用于防止点击点赞时跳转到详情页
        if (liked) {
          // 如果已经点赞，则取消点赞
          setLiked(false);
          const cachedLikedList = JSON.parse(localStorage.getItem('cachedLikedList'));
          if (cachedLikedList) {
            // 找到相同 id 处，并删除该项
            const updatedList = cachedLikedList.filter(itemId => itemId !== id);
            localStorage.setItem('cachedLikedList', JSON.stringify(updatedList));
            setLikes(likes - 1);
            // 向后端发送取消点赞的请求
          }
        } else {
          // 如果尚未点赞，则点赞
          setLiked(true);
          const cachedLikedList = JSON.parse(localStorage.getItem('cachedLikedList')) || [];
          // 将 id 添加到 cachedLikedList 中
          localStorage.setItem('cachedLikedList', JSON.stringify([...cachedLikedList, id]));
          setLikes(likes + 1);
            // 向后端发送点赞的请求
        }
      };
      
    return (
        <div className="inf-card" onClick={handleWatchDetail}>
            <div className="inf-card-image-wrapper">
                <img src={imageUrl} alt={title} className="inf-card-image" />
            </div>
            <div className="inf-card-title">{title}</div>
            <div className="inf-card-user">
                <div className="inf-card-avatar-wrapper">
                    <img src={avatarUrl ? avatarUrl : 'https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712250000&t=4656932f5ea4aec126098e5189a99cef'} alt="Avatar" className="inf-card-avatar-image" />
                </div>
                <div className="inf-card-avatar">{username.substring(0, 6)}...</div>

                <div className="inf-card-likes" onClick={handleLiked}>
                    {liked ? <HeartFill fontSize="18px" color="#FF0000" /> : <HeartOutline color='var(--adm-color-danger)' fontSize="18px" />}
                    {likes<=0 ? '': likes}
                </div>
            </div>
        </div>
    );
};


export default InfCard;
