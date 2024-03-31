/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-27 18:42:58
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-03-31 01:24:44
 * @FilePath: \frontend\src\pages\Publish\Publish.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Publish.js

import React, { useState } from 'react'
import './Publish.css'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import Editing from '../../components/Editing/Editing'
import { LeftOutline } from 'antd-mobile-icons';
import { Button } from 'antd-mobile';
import { DownlandOutline, EyeOutline } from 'antd-mobile-icons'
const Publish = () => {
  return (
    <div style={{ margin: '10px' }}> {/* 添加外边距 */}
      <div>
        <Button
          style={{ background: 'transparent', border: 'none' }}
          onClick={() => { /* 透明按钮的点击事件 */ }}
        >
          <LeftOutline />
        </Button>
      </div>
      <div style={{ margin: '10px', marginTop: '0px' }}>
        <ImageUpload />
        <Editing />
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <Button style={{ background: 'transparent', border: 'none' }}>
            <DownlandOutline /> 存草稿
          </Button>
          <Button style={{ background: 'transparent', border: 'none' }}>
            <EyeOutline /> 预览
          </Button>
          <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px', flex: '1', marginLeft: '10px' }}>
            发布游记
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
