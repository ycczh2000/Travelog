import React, { useState, useRef, useEffect } from "react"
import { Table, Button, Form, Input, Modal, Select, Tag, Space } from "antd"
import { useLocation, Navigate, useNavigate } from "react-router-dom"
import MyNotification from "../../components/MyNotification/MyNotification"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { $travelogs, $deleteTravelog } from "../../api/adminApi"
import styles from "./Travelog.module.scss"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { convertUTCToBeijingTime } from "../../utils/utils"
const { RangePicker } = DatePicker
const { Option } = Select
const { confirm } = Modal
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
    offset: 1,
  },
}

const modalSetting = {
  okText: "新建",
  cancelText: "取消",
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

export default function Task() {
  const [tableData, setTableData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  const [form] = Form.useForm()
  const [addform] = Form.useForm()
  const navigate = useNavigate()
  const userinfo = 123
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
            const result = await $deleteTravelog(id).then(loadTravelogs)
            console.log("sad", id)
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

  const filterInputItem = [
    { title: "标题", dataIndex: "title" },
    // { title: "创建时间", dataIndex: "createDate" },
    // { title: "审核状态", dataIndex: "status" },
    { title: "发布人", dataIndex: "authorUsername" },
    { title: "审核人", dataIndex: "auditorUsername" },
  ]

  const handleModalOk = () => {
    addform.setFieldValue("adminName", userinfo.name)
    addform.submit()
    console.log(userinfo)
    console.log(addform.getFieldsValue(true))
  }

  const handleModalCancel = () => {
    addform.resetFields()
    setModalOpen(false)
  }

  const handleAddFinish = value => {
    console.log(value)
    const newData = {
      ...value,
    }
    setTableData([...tableData, newData])
    setModalOpen(false)
    setNotiMsg({ type: "success", description: "添加成功" })
  }

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
    {
      title: "创建时间",
      dataIndex: "createDate",
      ellipsis: true,
      render: (_, { createDate }) => convertUTCToBeijingTime(createDate),
    },
    // .slice(0, 10)
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
        console.log(e)
        return (
          <Space size="middle">
            <a onClick={() => handleOperateClick(_id, "audit")}>审核</a>
            <a onClick={() => handleOperateClick(_id, "delete")}>删除</a>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      {userinfo ? (
        <>
          <div className={styles.card}>
            <Form layout={"inline"} form={form} onFinish={queryFinish}>
              {filterInputItem.map(item => (
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
              <Form.Item
                {...formItemLayout}
                style={{ width: "30%", marginTop: "10px" }}
                label={"创建时间"}
                name={"createDate"}>
                <RangePicker
                  presets={[
                    {
                      label: "两天内",
                      value: dayjs().add(-2, "d"),
                    },
                  ]}
                />
              </Form.Item>
            </Form>
            <div className={styles.buttonArea}>
              <Button
                className="btn"
                type="primary"
                onClick={() => {
                  form.submit()
                }}>
                查询
              </Button>
              <Button className="btn" onClick={resetFileds}>
                重置
              </Button>
              {userinfo.authority === "admin" && (
                <Button className="btn" onClick={() => setModalOpen(true)} type="primary">
                  + 新建
                </Button>
              )}
            </div>
          </div>
          <Table columns={columns} dataSource={tableData} />
          <Modal {...modalSetting} forceRender open={modalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
            <header className={styles.modelHeader}>基本信息</header>
            <div className={styles.card}>
              <Form layout={"horizontal"} form={addform} onFinish={handleAddFinish}>
                <Form.Item
                  {...modelFormItemLayout}
                  style={{ marginTop: "10px" }}
                  label={"姓名"}
                  name={"name"}
                  rules={[
                    {
                      message: "请输入姓名",
                      type: "string",
                      required: true,
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  {...modelFormItemLayout}
                  style={{ marginTop: "10px" }}
                  label={"性别"}
                  name={"sex"}
                  rules={[
                    {
                      message: "请选择性别",
                      type: "string",
                      required: true,
                    },
                  ]}>
                  <Select allowClear>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...modelFormItemLayout}
                  style={{ marginTop: "10px" }}
                  label={"年龄"}
                  name={"age"}
                  rules={[
                    {
                      message: "请输入年龄",
                      transform: value => Number(value),
                      min: 0,
                      max: 150,
                      type: "number",
                      required: true,
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item {...modelFormItemLayout} style={{ marginTop: "10px" }} label={"地址"} name={"address"}>
                  <Input />
                </Form.Item>
                <Form.Item {...modelFormItemLayout} label="备注信息" name="details" rules={[{}]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item hidden label="创建人" name="adminName">
                  <Input />
                </Form.Item>
              </Form>
              <div className="button-area"></div>
            </div>
          </Modal>
          <MyNotification notiMsg={notiMsg} />
        </>
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  )
}
