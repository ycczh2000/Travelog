import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import { $travelog } from "../../api/adminApi"
import { Image } from "antd"
import { Button, Modal, Form, Input, Radio, Space, Tag } from "antd"
import { $deleteTravelog, $auditTravelog, $getNextTravelog } from "../../api/adminApi"
import { ExclamationCircleFilled } from "@ant-design/icons"
import MyNotification from "../../components/MyNotification/MyNotification"
import styles from "./Detail.module.scss"
import { baseURL } from "../../config/config"
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

const AuditTag = {
  approved: { text: "已通过", color: "green" },
  rejected: { text: "未通过", color: "red" },
  pending: { text: "待审核", color: "orange" },
}

export default function Detail() {
  const [loading, setLoading] = useState(loadingStatus.LOADING)
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  const [travelog, setTravelog] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [rejectform] = Form.useForm()
  const { title, images, tags, content, status } = travelog
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const [audit, setAudit] = useState(status) //当前游记的审核状态，审核后会更新
  let { id } = useParams()
  let navigate = useNavigate()
  useEffect(() => {
    getTravelog()
  }, [id])

  const getTravelog = async () => {
    const result = await $travelog(id).catch(() => {
      setLoading(loadingStatus.ERROR)
    })
    console.log("getTravelog", result)
    if (result?.success) {
      setLoading(loadingStatus.SUCCESS)
      setTravelog(result.data)
      setAudit(result.data?.status)
      console.log(result.data?.status)
    } else {
      setNotiMsg({ type: "error", description: result.message })
      setLoading(loadingStatus.ERROR)
    }
  }

  const handleAudit = async auditResult => {
    const result = await $auditTravelog(id, { ...auditResult })
    if (result.success) {
      setNotiMsg({ type: "success", description: result.message })
      setAudit(auditResult.auditStatus)
    } else {
      setNotiMsg({ type: "error", description: result.message })
    }
  }

  const handleNext = async () => {
    const result = await $getNextTravelog()
    console.log(result)
    if (result.success && result.data) {
      navigate(`/layout/travelog/${result.data}`, { replace: true })
    } else if (result.success && !result.data) {
      setNotiMsg({ type: "success", description: result.message })
    } else {
      setNotiMsg({ type: "error", description: result.message })
    }
  }

  const handleRejectFormFinish = value => {
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
        if (result.success) {
          setNotiMsg({ type: "success", description: result.message })
        } else {
          setNotiMsg({ type: "error", description: result.message })
        }
      },
    })
  }

  if (loading === loadingStatus.LOADING) {
    return <div>Loading...</div>
  }

  if (loading === loadingStatus.ERROR) {
    return (
      <div>
        <MyNotification notiMsg={notiMsg} layout={"vertical"} />
      </div>
    )
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
            <Image src={`${baseURL}images/${image}`} />
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
            danger
            className={styles.btn}
            key="rejected"
            onClick={() => {
              setModalOpen(true)
            }}>
            拒绝
          </Button>
          {userInfo?.role === "admin" ? (
            <Button
              className={styles.btn}
              key="pending"
              type="primary"
              onClick={() => handleAudit({ auditStatus: AuditStatus.PENDING })}>
              重置
            </Button>
          ) : null}
        </div>
        <div className={styles.auditState}>
          {AuditTag[audit] ? (
            <Tag className={styles.tag} color={AuditTag[audit].color}>
              {AuditTag[audit].text}
            </Tag>
          ) : null}
        </div>
        <div className={styles.backButtonArea}>
          {userInfo.role === "admin" ? (
            <Button className={styles.btn} onClick={handleDeleteButton} type="primary" key="delete" danger>
              删除
            </Button>
          ) : null}
          <Button className={styles.btn} onClick={handleNext}>
            下一篇
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
