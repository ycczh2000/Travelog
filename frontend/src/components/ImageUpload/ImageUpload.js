/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-03-28 00:07:27
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-03-29 00:51:33
 * @FilePath: \frontend\src\components\ImageUpload\ImageUploader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// ImageUpload.js

import React, { useState } from 'react'
import { ImageUploader, Space, Toast, Dialog } from 'antd-mobile'
import './ImageUpload.css'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
// const ImageUpload = require('../../components/ImageUpload/ImageUpload')

const  ImageUpload = () => {
    const maxCount = 9;
    const [fileList, setFileList] = useState([
      {
        // url: demoSrc,
      },
    ]);
    
  return (
    <div>
      <ImageUploader
        style={{ '--cell-size': '150px','display': 'inline-block' }}
        value={fileList}
        onChange={setFileList}
        multiple
        maxCount={maxCount}
        showUpload={fileList.length < maxCount}
        onCountExceed={exceed => {
          Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
