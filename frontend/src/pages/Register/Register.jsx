import React from "react"
import styles from "./Register.module.scss"
import { Form, Input, Button, Toast } from "antd-mobile"
import { CalendarOutline } from "antd-mobile-icons"
import { $register } from "../../api/userApi"

export default function Register() {
  const [form] = Form.useForm()
  const onFinishHandle = async () => {
    const values = form.getFieldsValue()
    const result = await $register(values)
    Toast.show(result.message)
    if (result.success) {
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }
  }
  return (
    <>
      <CalendarOutline className={styles.icon} />
      <p>记录你的旅程</p>
      <p>世界这么大，我想去看看~</p>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinishHandle}
        onFinishFailed={e =>
          Toast.show({
            content: e.errorFields[0].errors[0],
            duration: 2000,
          })
        }
        footer={
          <Button className={styles.registerButton} block type="submit">
            注册
          </Button>
        }>
        {/* <Form.Header>水平布局表单</Form.Header> */}
        <Form.Item
          noStyle
          name="username"
          rules={[
            { type: "string" },
            { max: 16, message: "用户名长度不能超过16个字符" },
            { min: 6, message: "用户名长度不能少于6个字符" },
            { required: true, message: "请输入用户名" },
            { pattern: /^[a-zA-Z0-9_@\u4e00-\u9fa5]+$/, message: "用户名只能包含中文、英文、数字、@和下划线" },
          ]}>
          <Input className={styles.input} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          noStyle
          name="password"
          rules={[
            { type: "string" },
            { max: 16, message: "密码长度不能超过16个字符" },
            { min: 6, message: "密码长度不能少于6个字符" },
            { required: true, message: "请输入密码" },
            { pattern: /^[A-Za-z0-9!@#$%^&*]+$/, message: "密码只能包含字母、数字和特定符号(!@#$%^&*)" },
          ]}>
          <Input type="password" className={styles.input} placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  )
}
