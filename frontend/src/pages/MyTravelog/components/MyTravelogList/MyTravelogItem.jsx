import React from "react"
import { Image, Button, Tag } from "antd-mobile"
import styles from "./MyTravelogItem.module.scss"
import { ExclamationCircleOutline, HeartFill } from "antd-mobile-icons"
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
  console.log(item)
  const audit = item.examine
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
          <Button color="success" fill="outline" size="small">
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
