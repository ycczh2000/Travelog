/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-05 16:18:15
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 19:52:14
 * @FilePath: \frontend\src\pages\Detaillog\Detaillog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, createContext, useContext } from "react"
import { LeftOutline } from "antd-mobile-icons"
import { FloatingBubble, Popup, Button } from "antd-mobile"
import { HeartOutline, HeartFill } from "antd-mobile-icons"
import { CiPaperplane } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom"
import SwiperN from "../../components/swiper/swiper"
import UserInfo from "../../components/UserInfo/UserInfo"
import Details from "../../components/Details/Details"
import Content from "../../components/content/content"
import Comment from "../../components/comment/comment"
import { $getTravelogsByID } from "../../api/travelogApi"
import Share from "social-share-react"
import { baseURL } from "../../config/config"

const Detaillog = () => {
  const { id } = useParams()
  const location = useLocation()
  // const queryParams = new URLSearchParams(location.search);
  // console.log("logID:", logID)
  // const title = queryParams.get('title');
  // const content = queryParams.get('content');
  // const city = queryParams.get('city')?.split(',');
  // const tripInfo = JSON.parse(queryParams.get('tempTripInfo'));
  const [shareVisible, setShareVisible] = React.useState(false)
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
    userAvatar: "https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png",
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

  useEffect(() => {//如果通过路由接收到logID，则从后端获取数据
    const fetchData = async () => {
      // 发送fetch请求，获取其他数据
      try {
        const travelog = await $getTravelogsByID(id) // 使用 ID 调用 API 获取游记信息
        console.log("travelog:", travelog)
        // 设置获取到的数据
        setTitle(travelog.data.title)
        setContent(travelog.data.content)
        setCity(travelog.data.Location ? travelog.data.Location : [])

        setTripInfo({
          tripNum: travelog.data.tripNum,
          tripDate: travelog.data.tripDate,
          tripBudget: travelog.data.tripBudget,
          tripRate: travelog.data.rate,
          tripWay: travelog.data.tripWay,
        })
        const prefixedImages = travelog.data.images.map(image => `${baseURL}images/` + image)
        setBannerList(prefixedImages)
        // setBannerList(travelog.data.images);
        setDetailInfo({
          authorUID: travelog.data.authorId,
          username: travelog.data.username,
          createDate: travelog.data.createDate,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    // };
    fetchData() // 调用数据获取函数
  }, [])

  useEffect(() => {
    if (!id)//id为空，说明并不是由服务端发送的数据，而是本地预览
      return
    // 检查 localStorage喜欢列表中是否存在为 {id} 的值
    let likedList = JSON.parse(localStorage.getItem("likedList"))
    if (!likedList) {
      likedList = []
      localStorage.setItem("likedList", JSON.stringify(likedList))
    } else if (likedList.includes(id)) {
      setLiked(true)
    }
  }, [id])

  const handleLiked = event => {
    event.stopPropagation() // 阻止事件冒泡，防止触发父组件的 onClick,用于防止点击点赞时跳转到详情页
    if (!id)//id为空，说明并不是由服务端发送的数据，而是本地预览
      return
    if (liked) {
      // 如果已经点赞，则取消点赞
      setLiked(false)
      const likedList = JSON.parse(localStorage.getItem("likedList"))
      if (likedList) {
        const updatedList = likedList.filter(itemId => itemId !== id)
        localStorage.setItem("likedList", JSON.stringify(updatedList))
        // 向后端发送取消点赞的请求
      }
    } else {
      // 如果尚未点赞，则点赞
      setLiked(true)
      const likedList = JSON.parse(localStorage.getItem("likedList")) || []
      localStorage.setItem("likedList", JSON.stringify([...likedList, id]))
      // 向后端发送点赞的请求
    }
  }
  const handleGoBack = () => {
    window.history.go(-1)
  }
  const handleShare = () => {
    setShareVisible(true)
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
      <button
        className="transparent-button left-button"
        onClick={handleShare}
        style={{
          margin: "1rem",
          marginRight: "3.2rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          color: "rgba(0, 0, 0, 0.9)",
          letterSpacing: "0.05em",
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 999,
        }}>
        <CiPaperplane style={{ fontSize: "1.8rem" }} />
      </button>
      <SwiperN bannerList={bannerList} />      {/* 走马灯图片 */}
      <Details detailInfo={detailInfo} followed={followed} />      {/* 作者信息 */}
      <UserInfo title={title} content={content} city={city} />     {/* 标题,正文,旅行地点 */}
      <Content tripInfo={tripInfo} />   {/* 旅行信息 */}
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
      <Comment commentInfo={commentInfo} />   {/* 评论区 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Share
          url={`http://localhost:3000/${id}`}
          title={`分享生活点滴`}
          disabled={["google", "facebook", "twitter"]}></Share>
      </div>
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
      <Popup
        visible={shareVisible}
        onMaskClick={() => {
          setShareVisible(false)
        }}
        onClose={() => {
          setShareVisible(false)
        }}
        bodyStyle={{ height: '40vh' }}
      >
        <div style={{ marginTop: '50px', display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", fontWeight: "bold", color: "black", textTransform: "uppercase" }}>
          {title}</div>
        <Details detailInfo={detailInfo} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
          <Share
            url={`http://localhost:3000/${id}`}
            title={`分享生活点滴`}
            disabled={["google", "facebook", "twitter"]}></Share>
        </div>
      </Popup>
    </div>
  )
}

export default Detaillog
