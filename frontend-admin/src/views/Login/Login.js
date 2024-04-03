import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.scss"
import { Button, Form, Input, Select } from "antd"
import { $login } from "../../api/adminApi"
import MyNotification from "../../conponents/MyNotification/MyNotification"
export default function Login() {
  let navigate = useNavigate()
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" })
  const [form] = Form.useForm()
  const onFinish = async values => {
    try {
      let data = await $login(values)
      const { message, success, resdata } = data
      if (success) {
        navigate("/layout/task", { state: { userinfo: resdata } })
      } else {
        setNotiMsg({ type: "error", description: message })
      }
    } catch (e) {
      setNotiMsg({ type: "error", description: e.message })
    }
  }

  return (
    <div className="login-page">
      <div className="login">
        <div className="card">
          <h2>Hi,欢迎登录</h2>
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 19,
            }}
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item label="角色" name="role">
              <Select
                defaultValue="审核员"
                options={[
                  {
                    value: "admin",
                    label: "审核员",
                  },
                  {
                    value: "auditor",
                    label: "管理员",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              className="button-area"
              wrapperCol={{
                offset: 6,
                span: 18,
              }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <br />
              <p className="register-link">
                没有账号？<Link to="/register">点击注册</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
        <MyNotification notiMsg={notiMsg} />
      </div>
    </div>
  )
}
