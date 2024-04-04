import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { $travelog } from "../../api/adminApi"
import { Image } from "antd"
import { Button, Modal, Form, Input, Radio, Space } from "antd"
import { $deleteTravelog, $auditTravelog } from "../../api/adminApi"
import { ExclamationCircleFilled } from "@ant-design/icons"
import MyNotification from "../../components/MyNotification/MyNotification"
import styles from "./Detail.module.scss"
const { confirm } = Modal
const loadingStatus = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
}

const AuditStatus = {
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
}

const modelFormItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
    offset: 1,
  },
}

export default function Detail() {
  const [loading, setLoading] = useState(loadingStatus.LOADING)
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  let { id } = useParams()
  const [travelog, setTravelog] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [rejectform] = Form.useForm()

  const { title, images, tags, content } = travelog
  const imgSrc = "https://dimg04.c-ctrip.com/images/01019120008gm9rczEEBF_R_800_10000_Q90.jpg?proc=autoorient"
  let navigate = useNavigate()
  useEffect(() => {
    getTravelog()
  }, [id])

  const getTravelog = async () => {
    const result = await $travelog(id).catch(e => {
      setLoading(loadingStatus.ERROR)
    })
    setLoading(loadingStatus.SUCCESS)
    setTravelog(result.data)
    console.log(result.data)
  }
  const handleAudit = async auditResult => {
    const result = await $auditTravelog(id, { ...auditResult })
    if (result.success) {
      setNotiMsg({ type: "success", description: result.message })
    }
  }
  const handleRejectFormFinish = value => {
    //对象转化为json
    const reason = JSON.stringify(value)
    handleAudit({ auditStatus: AuditStatus.REJECTED, reason: reason }).then(setModalOpen(false))
  }

  const handleModalOk = () => {
    rejectform.submit()
  }

  const handleModalCancel = () => {
    rejectform.resetFields()
    setModalOpen(false)
  }

  const handleDeleteButton = () => {
    confirm({
      title: "系统提示",
      icon: <ExclamationCircleFilled />,
      content: "确定要删除吗",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        const result = await $deleteTravelog(id)
        console.log("sad", id)
      },
    })
  }

  if (loading === loadingStatus.LOADING) {
    return <div>Loading...</div>
  }

  if (loading === loadingStatus.ERROR) {
    return <div>页面不存在</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.travelog}>
        <h1 className={styles.title}>{title}</h1>
        <ul className={styles.tags}>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <div className={styles.imgArea}>
          {images.map(image => (
            <Image src={imgSrc} />
          ))}
        </div>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
        <div className={styles.comment}></div>
      </div>
      <div className={styles.buttonArea}>
        <div className={styles.auditButtonArea}>
          <Button
            className={styles.btn}
            key="approved"
            type="primary"
            onClick={() => handleAudit({ auditStatus: AuditStatus.APPROVED })}>
            通过
          </Button>
          <Button
            className={styles.btn}
            key="rejected"
            type="primary"
            onClick={() => {
              setModalOpen(true)
            }}>
            拒绝
          </Button>
          <Button
            className={styles.btn}
            key="pending"
            type="primary"
            onClick={() => handleAudit({ auditStatus: AuditStatus.PENDING })}>
            重置
          </Button>
        </div>
        <div className={styles.backButtonArea}>
          <Button className={styles.btn} onClick={handleDeleteButton} type="primary" key="delete" danger>
            删除
          </Button>
          <Button className={styles.btn} onClick={() => navigate(-1)}>
            返回
          </Button>
        </div>
      </div>

      <Modal
        okText="确定"
        cancelText="取消"
        forceRender
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}>
        <header className={styles.modelHeader}>拒绝理由</header>
        <div className={styles.card}>
          <Form form={rejectform} layout="vertical" onFinish={handleRejectFormFinish}>
            <Form.Item name="reason" required={true} rules={[{ required: true, message: "请选择原因" }]}>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={"图片违规"}>图片违规</Radio>
                  <Radio value={"内容违规"}>内容违规</Radio>
                  <Radio value={"版权问题"}>版权问题</Radio>
                  <Radio value={"其它原因"}>其它原因</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="详细原因:" name="details">
              <Input.TextArea className={styles.textarea} showCount maxLength={100} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <MyNotification notiMsg={notiMsg} layout={"vertical"} />
    </div>
  )
}
