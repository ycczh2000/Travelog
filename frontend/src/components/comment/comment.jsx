/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:17:38
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-05 23:41:22
 * @FilePath: \frontend\src\components\comment\comment.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import './comment.css';

const Comment = ({ commentInfo }) => {
  return (
    <div className="commentsWrapper">
      <div className="header">
        <h2>用户评论</h2>
      </div>
      <div className="comments">
        {commentInfo.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <p className="userName">{comment.userName}</p>
            <p className="content">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
