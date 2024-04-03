/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-27 18:42:58
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 00:40:41
 * @FilePath: \frontend\src\pages\Publish\Publish.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Publish.js

import React, { useState,useRef,useEffect } from 'react'
import './Publish.css'
import ImageUpload,{getFileList} from '../../components/ImageUpload/ImageUpload'
import Editing from '../../components/Editing/Editing'
import { LeftOutline } from 'antd-mobile-icons';
import { Button } from 'antd-mobile';
import { DownlandOutline, EyeOutline } from 'antd-mobile-icons'

const Publish = () => {
  const [fileList, setFileList] = useState([]);
  const [editingData, setEditingData] = useState({});
  const imageUploadRef = useRef(null);
  const editingRef = useRef(null);
  const handlePublishClick = () => {
    const imageUploadInstance = imageUploadRef.current;
    const fileList = imageUploadInstance.getFileList();
    const editingData = editingRef.current.getEditingData();
    console.log(editingData);
    console.log( fileList);
     // 发布游记后，销毁本地存储中的草稿数据
     localStorage.removeItem('draftData');
  };
  
  const handleSaveDraftClick = () => {
    // 获取当前的 fileList 和 editingData
    const fileList = imageUploadRef.current.getFileList();
    const editingData = editingRef.current.getEditingData();

    // 将 fileList 和 editingData 转换为 JSON 字符串
    const draftData = JSON.stringify({ fileList, editingData });

    // 将数据保存到本地存储中
    localStorage.setItem('draftData', draftData);
    console.log('Draft saved!');
};
  useEffect(() => {
    const draftData = localStorage.getItem('draftData');
    if (draftData) {
        const { fileList, editingData } = JSON.parse(draftData);
        setFileList(fileList);
        setEditingData(editingData);
        console.log('draft loaded');
        console.log(fileList, editingData);
    }
  }, []);
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
        <ImageUpload ref={imageUploadRef} fileList={fileList}/>
        <Editing ref={editingRef} editingData={editingData} />
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <Button onClick={handleSaveDraftClick} style={{ background: 'transparent', border: 'none' }}>
            <DownlandOutline /> 存草稿
          </Button>
          <Button style={{ background: 'transparent', border: 'none' }}>
            <EyeOutline /> 预览
          </Button>
          <Button onClick={handlePublishClick} style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px', flex: '1', marginLeft: '10px' }}>
            发布游记
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default Publish;
