/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:18:15
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 20:25:52
 * @FilePath: \frontend\src\pages\Detaillog\Detaillog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, createContext, useContext } from "react"
import { LeftOutline } from "antd-mobile-icons"
import { FloatingBubble, Toast,WaterMark,Button } from "antd-mobile"
import { HeartOutline, HeartFill } from "antd-mobile-icons"
import { CiPaperplane } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom"
import SwiperN from "../../components/swiper/swiper"
import UserInfo from "../../components/UserInfo/UserInfo"
import Details from "../../components/Details/Details"
import Content from "../../components/content/content"
import Comment from "../../components/comment/comment"
import { UserContext } from "../../Context/UserContext"
import { $getTravelogsByID } from "../../api/travelogApi"
import Share from "social-share-react"
import { baseURL } from "../../config/config"

const PreviewPage = () => {
  const { userName } = useContext(UserContext)//自己账户的用户名
  const location = useLocation()
  const params = useParams();
  const combinedData = JSON.parse(decodeURIComponent(params.data));

  // 从 combinedData 中提取文件列表和编辑数据
  const fileList = combinedData.fileList;
  const editingData = combinedData.editingData;
  // console.log('文件列表:', fileList, '编辑数据:', editingData);
  const [liked, setLiked] = React.useState(false)
  const [followed, setFollowed] = React.useState(false)
  const [title, setTitle] = useState("游记标题")
  const [content, setContent] = useState("游记内容")
  const [city, setCity] = useState([])
  const [tripInfo, setTripInfo] = useState({
    tripWay: null,
    tripNum: null,
    tripDate: null,
    tripBudget: null,
    tripRate: null,
  })
  const [bannerList, setBannerList] = useState([
    "https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png",
    "https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png",
    "https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png",
  ])
  const [detailInfo, setDetailInfo] = useState({
    authorUID: "123456789",
    username: "用户名",
    createDate: "2024-04-05 16:18:15",
  })
  const [commentInfo, setCommentInfo] = useState({
    comments: [
      {
        userName: "用户名A",
        content: "评论内容A",
      },
      {
        userName: "用户名B",
        content: "评论内容B",
      },
    ],
  })

  useEffect(() => {
    setBannerList(editingData.images.map(image => `${baseURL}images/${image}`));
    // console.log(bannerList)
    setTitle(editingData.title)
    setContent(editingData.content)
    setCity(editingData.Location)
    setDetailInfo({
      ...detailInfo,
      userAvatar: editingData.userAvatar,
      username: userName,
      createDate: '正在实时预览'
    })
    setTripInfo({
      tripWay: editingData.tripWay,
      tripNum: editingData.tripNum,
      tripDate: editingData.tripDate,
      tripBudget: editingData.tripBudget,
      tripRate: editingData.rate,
    })
  },[])

  const handleLiked = () => {
    setLiked(!liked)
    Toast.show({
      icon: 'success',
      content: liked?'模拟本地点赞成功':'模拟取消点赞成功'
    })
  }

  const handleGoBack = () => {
    window.history.go(-1) // 返回上一页面
  }

  return (
    <div style={{ width: "100%" }}>
      <button
        className="transparent-button left-button"
        onClick={handleGoBack}
        style={{
          margin: "1rem",
          marginLeft: "0.5rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          color: "rgba(0, 0, 0, 0.9)",
          letterSpacing: "0.05em",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
        }}>
        <LeftOutline />
      </button>

      <SwiperN bannerList={bannerList} />
      <Details detailInfo={detailInfo} followed={followed} />
      <WaterMark
          fontColor="rgba(0, 0, 0, 0.08)"
          content={userName + '预览页'}
          gapX={12}
          gapY={24}
          fullPage={false}
        />
      <UserInfo title={title} content={content} city={city} />
      <Content tripInfo={tripInfo} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem", margin: "1rem" }}>
        {tripInfo.tripRate >= 2 && ( // 只有当rate大于2时才一键fork
          <Button block size='small' color='primary' fill='outline' style={{ borderRadius: "20px" }}>
            一键fork
          </Button>
        )}
        {tripInfo.tripRate < 2 && ( // 只有当rate于2时显示一键避雷
          <Button block size='small' color='danger' fill='outline' style={{ borderRadius: "20px" }}>
            一键避雷
          </Button>
        )}
      </div>
      <Comment commentInfo={commentInfo} />
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "100px",
          "--edge-distance": "24px",
          "--background": "rgba(255, 255, 255, 0.8)",
        }}
        onClick={handleLiked}>
        {liked ? (
          <HeartFill fontSize="36px" color="#FF0000" />
        ) : (
          <HeartOutline color="var(--adm-color-danger)" fontSize="36px" />
        )}
      </FloatingBubble>
    </div>
  )
}

export default PreviewPage
