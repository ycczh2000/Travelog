import React, { useState, useEffect } from "react"
import MyTravelogList from "./components/MyTravelogList/MyTravelogList"
import MyTravelogHeader from "./components/MyTravelogHeader/MyTravelogHeader"
import MyTravelogFilter from "./components/MyTravelogFilter/MyTravelogFilter"
import { UpOutline, CloseCircleFill, StarFill, UploadOutlined } from "antd-mobile-icons"
import styles from "./MyTravelog.module.scss"
import { UserSpaceContentProvider } from "./UserSpaceContent"
import { UserContext } from "../../Context/UserContext"
import { Toast, Popup, Button, Slider, Dialog } from "antd-mobile"
import "./MyTravelog.css"
import { $getMyTravelogs, $deleteTravelog } from "../../api/travelogApi"
import AvatarEditor from "react-avatar-editor"
import { $uploadAvatar, $getAvatar } from "../../api/userApi"

export default function MyTravelog() {
  const MoMo = 'https://img1.baidu.com/it/u=1389873612,485301600&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712682000&t=ff2af80b5ee2888d42c58c2aff22a8d3'
  //默认的头像地址(MOMO头像)

  const { UID, setUID, userName, setUserName } = React.useContext(UserContext)
  console.log(userName, UID)
  const [myTravelogList, setMyTravelogList] = useState([])
  const [totop, setTotop] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState(`http://localhost:8000/getAvatar/${userName}` || MoMo);
  // 用于存放用户头像的URL(从服务器获取)
  const [visible, setVisible] = useState(false) //标志上传头像的弹出组件是否弹出
  const [avatarFile, setAvatarFile] = useState('')// 用于存储用户选择的头像文件(本地待上传的)
  const [avatarScale, setAvatarScale] = useState(1)// 用于存放头像缩放倍率
  const [editor, setEditor] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('UID');
    setUID('');
    setUserName('');
    alert('退出成功');
    window.location.href = "/";
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(URL.createObjectURL(file)); // 将文件转换为 URL 并设置为 avatarFile
    }
  };

  const handleConfirm = () => {
    if (avatarFile) {
      const canvas = editor.getImage();
      const croppedAvatarFile = canvas.toDataURL(); // 获取裁剪后的图像数据 URL
      // 此时 croppedAvatarFile 就是裁剪后的图像数据 URL
      console.log('url after cropping:', croppedAvatarFile);
      const blob = dataURItoBlob(croppedAvatarFile);
      // 创建一个新的文件对象
      const file = new File([blob], 'cropped_image.png', { type: 'image/png' });
      // console.log('file:', file);
      upload(file)
      Toast.show({
        content: '上传成功',
      })
      setAvatarUrl(croppedAvatarFile)
      setVisible(false)
    }
    else{
      Toast.show({
        content: '请先选择上传的头像',
      })
    }
  };

  const upload = async (file) => {
    console.log("file:", file)
    const res = await $uploadAvatar(file)
      .then(res => console.log("res", res))
      .catch(err => console.log("err", err))
  }

  const handleChangeScale = (value) => {//修改图片缩放
    setAvatarScale(value * 0.01 + 1);
  };

  function dataURItoBlob(dataURI) {//将dataURI(base64)转换为Blob对象（file)
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    // 返回一个 Blob 对象
    return new Blob([arrayBuffer], { type: 'image/png' });
  }

  const changeAvatarComponent = (
    <div>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <AvatarEditor
          ref={(ref) => setEditor(ref)}
          image={avatarFile}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={avatarScale}
          rotate={0}
          defaultValue={20}
        />

      </div>
      <input type="file" onChange={handleFileInputChange} style={{ display: "none" }} ref={(input) => input && input.setAttribute('accept', 'image/*')} />
      <Slider onAfterChange={handleChangeScale} />
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <Button
          block
          size="large"
          style={{ margin: "10px" }}
          // color='danger' 
          fill='outline'
          onClick={() => document.querySelector('input[type="file"]').click()} // 点击按钮触发文件选择框
        >
          选择文件
        </Button>
        <Button
          block
          color='primary'
          size="large"
          style={{ margin: "10px" }}
          onClick={handleConfirm}
        >
          确认
        </Button>
        <Button
          block
          size="large"
          style={{ margin: "10px" }}
          onClick={() => setVisible(false)}
          color='danger'
          fill='outline'
        >
          取消
        </Button>
      </div>
    </div>
  )
  // const [username, setUsername] = useState("MOMO")
  // const [uid, setUid] = useState("1145141919810")
  const loadingData = async () => {
    const res = await $getMyTravelogs()
    if (res.success) {
      setMyTravelogList(res.data)
    }
  }

  useEffect(() => {
    loadingData()
    setAvatarUrl(`http://localhost:8000/getAvatar/${userName}`);
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
              <div className="uid">tip:点击头像可以更换</div>
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
        )}  <div style={{ width: '95%', marginBottom: '30px' }}>
          <Button color='danger' block fill='outline' onClick={() => {
            Dialog.show({
              content: '你是否真的要退出账户？',
              closeOnAction: true,
              actions: [
                [
                  {
                    key: 'cancel',
                    text: '取消',
                  },
                  {
                    key: 'delete',
                    text: '退出',
                    bold: true,
                    danger: true,
                    onClick: () => {
                      console.log('退出账户');
                      handleLogout();
                    },
                  },
                ],
              ],
            })
          }}>
            退出账户
          </Button>
        </div>
      </UserSpaceContentProvider>
    </>
  )
}
