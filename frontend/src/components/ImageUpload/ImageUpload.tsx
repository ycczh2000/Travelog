/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-03 00:59:08
 * @FilePath: \Travelog\frontend\src\components\ImageUpload\ImageUpload.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState,useEffect, forwardRef, useImperativeHandle } from 'react';
import { ImageUploader, Toast } from 'antd-mobile';
import './ImageUpload.css';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';

import type { FC } from 'react'

const ImageUpload: FC =  forwardRef((props, ref) => {
  const maxCount: number = 9;
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
    },
  ]);
  
   async function mockUpload(file: File) {
    return {
      url: URL.createObjectURL(file),
    }
  }
  useImperativeHandle(ref, () => ({
    getFileList() {
      return fileList;
    }
  }));
  return (
      <ImageUploader
        columns={4}
        upload={mockUpload}
        style={{ '--cell-size': '150px', 'display': 'inline-block' }}
        value={fileList}
        onChange={setFileList}
        multiple={true}
        maxCount={maxCount}
        showUpload={fileList.length < maxCount}
        onCountExceed={(exceed: number) => {
          Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`);
        }}
      />
  );
});

export default ImageUpload;
