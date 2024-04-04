import React, { useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ExclamationCircleFilled } from "@ant-design/icons"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import { Layout, Menu, Button, Modal } from "antd"
import "./AppLayout.scss"
const { confirm } = Modal
const { Header, Sider, Content } = Layout
export default function AppLayout() {
  const navigate = useNavigate()

  const items = [
    {
      label: "首页",
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "邮件",
      key: "mail",
      icon: <AppstoreOutlined />,
    },
    {
      label: "通知",
      key: "notifacation",
      icon: <AppstoreOutlined />,
    },
    {
      label: "个人中心",
      key: "personal",
      icon: <SettingOutlined />,
      children: [
        {
          label: "个人信息",
          key: "1",
        },
        {
          label: "修改密码",
          key: "2",
        },
        {
          label: "退出系统",
          key: "exit",
        },
      ],
    },
  ]
  const item2 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "游记管理",
      children: [
        {
          key: "admin",
          label: "游记审核",
        },
      ],
    },
  ]
  const [current, setCurrent] = useState("")
  //控制折叠的状态
  const [collapsed, setCollapsed] = useState(false)
  const onMenuClick = e => {
    setCurrent(e.key)

    switch (e.key) {
      case "exit":
        confirm({
          title: "系统提示",
          icon: <ExclamationCircleFilled />,
          content: "确定退出系统吗",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            localStorage.removeItem("admintoken")
            navigate("/")
          },
        })
        break
      case "admin": {
        navigate("/layout/travelog")
        break
      }
    }
  }
  return (
    <Layout className="Layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">游记审核系统</div>
        <Menu onClick={onMenuClick} theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={item2} />
      </Sider>
      <Layout>
        <Header className="header">
          <Button
            className="trigger"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} //小图标变化
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            onClick={onMenuClick}
            className="menu"
            theme="dark"
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>

        <Content className="content">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
