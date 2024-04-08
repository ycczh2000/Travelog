import React, { useState, useEffect } from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
import { UpOutline, CloseCircleFill, StarFill, UploadOutlined } from "antd-mobile-icons"
import styles from "./MyTravelog.module.scss"
import { UserSpaceContentProvider } from "./UserSpaceContent"
import { UserContext } from "../../Context/UserContext"
import { card, Toast, Popup, Button } from "antd-mobile"
import "./MyTravelog.css"
import { $getMyTravelogs, $deleteTravelog } from "../../api/travelogApi"

import AvatarEditor from "react-avatar-editor"

export default function MyTravelog() {
  const { UID, setUID, userName, setUserName } = React.useContext(UserContext)
  console.log(userName, UID)
  const [myTravelogList, setMyTravelogList] = useState([])
  const [totop, setTotop] = useState(true)
  const [visible, setVisible] = useState(false) //标志上传头像的弹出组件是否弹出
  const [avatarFile, setAvatarFile] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ])
  const onChange = ({ avatarFile: newAvatarFile }) => {
    console.log("onChange", newAvatarFile)
    setAvatarFile(newAvatarFile)
  }
  const onPreview = async file => {
    console.log("onPreview", file)
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const changeAvatarComponent = (
    <div>
      <AvatarEditor
        image="https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712595600&t=76261ab2a1585815f46c7b306c6f66e3"
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />
      <Button
        block
        size="large"
        style={{ margin: "10px" }}
        onClick={() => {
          setVisible(false)
        }}>
        取消
      </Button>
    </div>
  )
  // const [username, setUsername] = useState("MOMO")
  // const [uid, setUid] = useState("1145141919810")

  const [avatarUrl, setAvatarUrl] = useState(
    "https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712595600&t=76261ab2a1585815f46c7b306c6f66e3"
  )
  const loadingData = async () => {
    const res = await $getMyTravelogs()
    if (res.success) {
      setMyTravelogList(res.data)
    }
  }
  useEffect(() => {
    loadingData()
  }, [])

  //删除方法 传入id 返回bool 之后只从前端移除myTravelogList中对应项，不用重新请求、加载数据
  //通过props向下传
  const deleteTravelog = async id => {
    console.log("deleteTravelog", id)
    const res = await $deleteTravelog(id)
    console.log(res)
    if (res.success) {
      const newMyTravelogList = myTravelogList.filter(item => item._id !== id)
      setMyTravelogList(newMyTravelogList)
      Toast.show("删除成功")
    } else Toast.show("删除失败")
  }

  return (
    <>
      <UserSpaceContentProvider>
        <div className="background-image"></div>
        <MyTravelogHeader />
        <div className="user-space">
          <div className="content">
            <div className="avatar" onClick={() => setVisible(true)}>
              <Popup
                visible={visible}
                onMaskClick={() => {
                  setVisible(false)
                }}
                bodyStyle={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  minHeight: "40vh",
                }}>
                {changeAvatarComponent}
              </Popup>
              <img src={avatarUrl} alt="User Avatar" />
            </div>
            <div className="user-details">
              <div className="username">{userName ? userName : "MOMO"}</div>
              <div className="uid">UID: {UID ? UID : 1145141919810}</div>
            </div>
          </div>
        </div>
        <MyTravelogFilter />
        <MyTravelogList myTravelogList={myTravelogList} deleteTravelog={deleteTravelog} />
        {totop ? (
          <div
            className={styles.totop}
            onClick={() => {
              // 点击后滚动到页面顶部
              window.scrollTo({
                top: 0,
                behavior: "smooth", // 平滑滚动
              })
            }}>
            <UpOutline style={{ fontSize: "1rem" }} />
          </div>
        ) : (
          <></>
        )}
      </UserSpaceContentProvider>
    </>
  )
}
