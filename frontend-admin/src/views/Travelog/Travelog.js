import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { Table, Button, Form, Input, Modal, Select, Tag, Space } from "antd"
import { useNavigate } from "react-router-dom"
import MyNotification from "../../components/MyNotification/MyNotification"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { $travelogs, $deleteTravelog } from "../../api/adminApi"
import styles from "./Travelog.module.scss"
import { convertUTCToBeijingTime } from "../../utils/utils"
import roleConfig from "./roleConfig"
const { Option } = Select
const { confirm } = Modal
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
    offset: 1,
  },
}

export default function Task() {
  const [tableData, setTableData] = useState([])
  const [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useContext(AuthContext)
  useEffect(() => {
    loadTravelogs()
  }, [])

  const handleOperateClick = (id, operate) => {
    console.log(id)
    switch (operate) {
      case "audit":
        navigate(`${id}`)
        break
      case "delete":
        confirm({
          title: "系统提示",
          icon: <ExclamationCircleFilled />,
          content: "确定要删除吗",
          okText: "确定",
          cancelText: "取消",
          onOk: async () => {
            const result = await $deleteTravelog(id)
            if (result?.success) {
              setNotiMsg({ type: "success", description: result.message })
              loadTravelogs()
            } else {
              setNotiMsg({ type: "error", description: result.message })
            }
          },
        })
        break
      default:
    }
  }

  const loadTravelogs = async () => {
    const data = await $travelogs()
    data.forEach(element => {
      element.key = element._id
    })
    console.log(data)
    setTableData(data)
  }

  //搜索项
  const selecterColumns = [
    { title: "标题", dataIndex: "title" },
    // { title: "创建时间", dataIndex: "createDate" },
    // { title: "审核状态", dataIndex: "status" },
    { title: "发布人", dataIndex: "authorUsername" },
    { title: "审核人", dataIndex: "auditorUsername" },
  ]

  const resetFileds = () => {
    form.resetFields()
    form.submit()
  }

  const queryFinish = async value => {
    console.log(value)
    const data = await $travelogs(value)
    data.forEach(element => {
      element.key = element._id
    })
    setTableData(data)
  }

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      ellipsis: true,
      width: 500,
      render: (_, { title, _id }) => <a onClick={() => navigate(`${_id}`)}>{title}</a>,
    },
    // {
    //   title: "上传时间",
    //   dataIndex: "uploadDate",
    //   ellipsis: true,
    //   render: (_, { uploadDate }) => convertUTCToBeijingTime(uploadDate),
    // },
    {
      title: "创建时间",
      dataIndex: "createDate",
      ellipsis: true,
      render: (_, { createDate }) => convertUTCToBeijingTime(createDate),
    },
    { title: "发布人", dataIndex: "authorUsername", ellipsis: true },
    { title: "审核人", dataIndex: "auditorUsername", ellipsis: true },
    {
      title: "审核状态",
      dataIndex: "status",
      ellipsis: true,
      render: (_, { status }) => {
        switch (status) {
          case "pending":
            return <Tag color="#2db7f5">待审核</Tag>
          case "approved":
            return <Tag color="#87d068">已通过</Tag>
          case "rejected":
            return <Tag color="#f50">未通过</Tag>
          default:
            return <Tag>数据错误!</Tag>
        }
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: 150,
      render: (e, { _id }) => {
        return (
          <Space size="middle">
            <a onClick={() => handleOperateClick(_id, "audit")}>审核</a>
            {userInfo?.role === "admin" ? <a onClick={() => handleOperateClick(_id, "delete")}>删除</a> : null}
          </Space>
        )
      },
    },
  ]

  const filteredColumns = columns.filter(column => roleConfig[userInfo?.role].includes(column.dataIndex))
  const filteredSelecterColumns = selecterColumns.filter(column =>
    roleConfig[userInfo?.role].includes(column.dataIndex)
  )

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h3 className={styles.welcomeText}>
          欢迎 {userInfo.role === "admin" ? "管理员" : "审核员"}
          用户: {userInfo.username}
        </h3>
        <Form layout={"inline"} form={form} onFinish={queryFinish}>
          {filteredSelecterColumns.map(item => (
            <Form.Item
              {...formItemLayout}
              key={item.dataIndex}
              style={{ width: "30%", marginTop: "10px" }}
              label={item.title}
              name={item.dataIndex}>
              <Input />
            </Form.Item>
          ))}
          <Form.Item
            key="status"
            name="status"
            label="审核状态"
            {...formItemLayout}
            style={{ width: "30%", marginTop: "10px" }}>
            <Select allowClear>
              <Option value="pending">待审核</Option>
              <Option value="approved">已通过</Option>
              <Option value="rejected">未通过</Option>
            </Select>
          </Form.Item>
        </Form>
        <div className={styles.buttonArea}>
          <Button
            className={styles.btn}
            type="primary"
            onClick={() => {
              form.submit()
            }}>
            查询
          </Button>
          <Button className={styles.btn} onClick={resetFileds}>
            重置
          </Button>
        </div>
      </div>
      <Table className={styles.table} columns={filteredColumns} dataSource={tableData} />
      <MyNotification notiMsg={notiMsg} />
    </div>
  )
}
