/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 22:10:07
 * @FilePath: \frontend\src\pages\MyTravelog\components\MyTravelogList\MyTravelogItem.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react"
import { Image, Button, Tag, Dialog } from "antd-mobile"
import styles from "./MyTravelogItem.module.scss"
import { ExclamationCircleOutline, HeartFill } from "antd-mobile-icons"
import { Modal, Space, Toast } from "antd-mobile"
import { $deleteTravelog } from "../../../../api/travelogApi"
// import "./MyTravelogItem.scss"
import { baseURL } from "../../../../config/config"

const extractReasonAndDetails = input => {
  const regex = /"reason":"([^"]+).*?"details":"([^"]+)/
  const match = input.match(regex)
  if (match) {
    const reason = match[1]
    const details = match[2]
    return { reason, details }
  } else {
    return { reason: null, details: null }
  }
}

const statusStyles = {
  pending: { color: "primary", fill: "outline" },
  approved: { color: "#87d068", fill: "outline" },
  rejected: { color: "#ff6430", fill: "outline" },
}

const statusTexts = {
  pending: "审核中",
  approved: "已通过",
  rejected: "未通过",
}
//上传时间 审核结束时间 排序
export default function MyTravelogItem(props) {
  //content返回长度需要限制
  const { item } = props
  const { _id, title, content, status, likesCount, images, viewsCount, rejectReason, createDate } = item
  //props用到的方法
  const { deleteTravelog } = props
  console.log("item", item)
  const handleDeleteForever = async () => {
    const result = await Modal.confirm({
      closeOnMaskClick: true,
      content: "确定要永久删除该游记吗？(真的很久)",
    })
    if (result) {
      try {
        const response = await deleteTravelog(_id)
        console.log("删除成功", response)
      } catch (error) {
        console.error("删除失败", error)
      }
    } else {
 
    }
  }

  //从我的游记进入详情页
  const handleTopClick = () => {
    if (status === "approved") {
      window.location.href = `/travelogs/${_id}`
    } else {
      Toast.show({
        content: "未通过的游记只能进入编辑页预览",
        position: "center",
      })
    }
  }

  return (
    <div className={styles.myTravelogItem}>
      <div className={styles.top} onClick={handleTopClick}>
        <Image
          className={styles.myTravelogImg}
          src={`${baseURL}images/` + images[0]}
          width={150}
          height={100}
          fit="cover"
        />
        <div className={styles.MyTravelogInfo}>
          <div className={styles.MyTravelogTitle}>{title}</div>
          <div className={styles.MyTravelogDescription}>{content}</div>
          <div className="inf-card-likes">
            {<HeartFill fontSize="18px" color="#FF0000" />}
            {likesCount}
          </div>
          <div className={styles.MyTravelogDate}>创建日期{createDate}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.auditResult}>
          <Tag style={{ fontSize: "1rem", padding: "0.3rem" }} {...statusStyles[status]}>
            {statusTexts[status]}
          </Tag>
          {status === "rejected" ? (
            <div
              style={{ color: "red", fontSize: "1rem", padding: "0.3rem" }}
              onClick={() => {
                Dialog.show({
                  content: (
                    <div>
                      <Space direction="vertical">
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                          {extractReasonAndDetails(rejectReason).reason}
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            lineHeight: "1.4",
                            maxHeight: "4.2rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: "1rem",
                          }}>
                          {extractReasonAndDetails(rejectReason).details}
                        </div>
                      </Space>
                    </div>
                  ),
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: "edit",
                        text: "编辑",
                        bold: true,
                        danger: true,
                        onClick: () => (window.location.href = `/update/${_id}`),
                      },
                      {
                        key: "cancel",
                        text: "取消",
                      },
                    ],
                  ],
                })
              }}>
              <ExclamationCircleOutline />
              {extractReasonAndDetails(rejectReason).reason ? extractReasonAndDetails(rejectReason).reason : ""}
            </div>
          ) : null}
        </div>
        <div className={styles.operate}>
          <Button onClick={() => (window.location.href = `/update/${_id}`)} color="success" fill="outline" size="small">
            编辑
          </Button>
          <Button color="danger" fill="outline" size="small" onClick={handleDeleteForever}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
