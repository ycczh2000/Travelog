import React, { useState, useRef, useEffect } from "react"
import { Table, Button, Form, Input, Modal, Select, Tag, Space } from "antd"
import { useLocation, Navigate } from "react-router-dom"
import MyNotification from "../../conponents/MyNotification/MyNotification"
import { $travelogs } from "../../api/adminApi"
import "./Task.scss"
const { Option } = Select

const columns = [
  { title: "标题", dataIndex: "title" },
  { title: "创建时间", dataIndex: "createDate" },
  { title: "发布人", dataIndex: "authorUsername" },
  { title: "审核人", dataIndex: "auditorUsername" },
  {
    title: "审核状态",
    dataIndex: "status",
    render: (_, { status }) => {
      return <Tag color="geekblue">{status}</Tag>
    },
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (e, { _id }) => {
      console.log(e)
      return (
        <Space size="middle">
          <a onClick={() => console.log(_id)}>审核</a>
          <a>删除</a>
        </Space>
      )
    },
  },
]

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  const [form] = Form.useForm()
  const [addform] = Form.useForm()

  const userinfo = 123
  useEffect(() => {
    loadTravelogs()
    console.log("123")
  }, [])

  const loadTravelogs = async () => {
    const data = await $travelogs()
    data.forEach(element => {
      element.key = element._id
    })
    console.log(data)
    setTableData(data)
  }

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const filterInputItem = [
    { title: "标题", dataIndex: "title" },
    { title: "创建时间", dataIndex: "createDate" },
    { title: "审核状态", dataIndex: "status" },
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

  const queryFinish = async value => {
    console.log(value)
    const data = await $travelogs(value)
    console.log("queryFinish", data)
  }

  return (
    <>
      {userinfo ? (
        <>
          <div className="card">
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
            </Form>
            <div className="button-area">
              <Button
                className="btn"
                type="primary"
                onClick={() => {
                  form.submit()
                }}>
                查询
              </Button>
              <Button className="btn">重置</Button>
              {userinfo.authority === "admin" && (
                <Button className="btn" onClick={() => setModalOpen(true)} type="primary">
                  + 新建
                </Button>
              )}
            </div>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} />
          <Modal {...modalSetting} forceRender open={modalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
            <header className="modal-header">基本信息</header>
            <div className="card">
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
