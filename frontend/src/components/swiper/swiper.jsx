import React from 'react'
import styles from "./swiper.css"
import {
  LeftOutlined
} from "@ant-design/icons"
import { useNavigate } from 'react-router'

const Swiper = ({data}) => {
  const navigate = useNavigate()
  return (
    <div>
    {/*  <img src={data.imageUrl} style={{width:'100px'}}/> */} 
    {data.map((data, index) => (  
        <img  
          key={index} // 使用索引作为key，但在实际生产环境中，最好使用每张图片的唯一标识符  
          src={data}  
          style={{ width: '100px', marginRight: '10px' }} // 添加一些间距以便更好地查看每张图片  
        /> 
    ))}
      </div>

    // <div className={styles.swiperbox}>
    //   <LeftOutlined style={{position:'absolute',left:'0.7rem',top:'0.8rem',fontSize:'18px'}} onClick={() => navigate('/')}/>
    // </div>
  )
    
}


export default Swiper