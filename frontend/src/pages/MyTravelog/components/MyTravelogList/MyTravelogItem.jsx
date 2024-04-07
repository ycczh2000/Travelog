/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-07 21:00:38
 * @FilePath: \frontend\src\pages\MyTravelog\components\MyTravelogList\MyTravelogItem.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react"
import { Image, Button, Tag } from "antd-mobile"
import styles from "./MyTravelogItem.module.scss"
import { ExclamationCircleOutline, HeartFill } from "antd-mobile-icons"
import { Modal, Space, Toast, Divider } from 'antd-mobile'
import { $deleteTravelog } from "../../../../api/travelogApi"
// import "./MyTravelogItem.scss"

const statusStyles = {
  0: { color: "primary", fill: "outline" },
  1: { color: "#87d068", fill: "outline" },
  "-1": { color: "#ff6430", fill: "outline" },
}

const statusTexts = {
  0: "审核中",
  1: "已通过",
  "-1": "未通过",
}
//上传时间 审核结束时间 排序
export default function MyTravelogItem(props) {
  const { item } = props
  // console.log(item)
  const audit = item.examine
  const handleDeleteForever = async() => {
    const result = await Modal.confirm({
      content: '确定要永久删除该游记吗？（真的很久）',
    })
    if (result) {
      Toast.show({ content: '点击了确认', position: 'bottom' })
      try {
        const response = await $deleteTravelog(item.id);
        console.log("删除成功", response);
      } catch (error) {
        console.error("删除失败", error);
      }
    } else {
      Toast.show({ content: '点击了取消', position: 'bottom' })
    }
  }
  return (
    <div className={styles.myTravelogItem}>
      <div className={styles.top}>
        <Image className={styles.myTravelogImg} src={item.imageUrl} width={150} height={100} fit="cover" />
        <div className={styles.MyTravelogInfo}>
          <div className={styles.MyTravelogTitle}>标题标题标题</div>
          <div className={styles.MyTravelogDescription}>
            详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情
          </div>
          <div className="inf-card-likes">
            {item.likes ? <HeartFill fontSize="18px" color="#FF0000" /> : null}
            {item.likes}
          </div>
          <div className={styles.MyTravelogDate}>提交日期</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.auditResult}>
          <Tag style={{ fontSize: "1rem", padding: "0.3rem" }} {...statusStyles[audit]}>
            {statusTexts[audit]}
          </Tag>
          {audit === -1 ? (
            <div>
              <ExclamationCircleOutline />
              查看原因
            </div>
          ) : null}
        </div>
        <div className={styles.operate}>
          <Button color="success" fill="outline" size="small">
            编辑
          </Button>
          <Button color="success" fill="outline" size="small" onClick={handleDeleteForever}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
