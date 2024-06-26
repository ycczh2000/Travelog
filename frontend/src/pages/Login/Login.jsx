import React, { useEffect, useContext } from "react"
import styles from "./Login.module.scss"
import { Form, Input, Button, Toast } from "antd-mobile"
import { CalendarOutline } from "antd-mobile-icons"
import { Link } from "react-router-dom"
import { $login } from "../../api/userApi"
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  let navigate = useNavigate()
  const { UID, setUID, userName, setUserName } = useContext(UserContext)
  const [form] = Form.useForm()

  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        if (localStorage.getItem("token")) {
          const result = await $login()
          if (result.success) {
            localStorage.setItem("UID", result.data.userId)
            localStorage.setItem("userName", result.data.username)
            setUID(result.data.userId)
            setUserName(result.data.username)
            Toast.show("自动登录成功")
            window.location.href = "/home"
          } else {
            Toast.show("自动登录失败：" + result.error)
          }
        }
      } catch (e) {
        console.error("自动登录出错：", e)
        Toast.show("自动登录出错：" + e.message)
      }
    }
    checkAutoLogin()
  }, [])

  const onFinishHandle = async () => {
    try {
      const values = form.getFieldsValue()
      const result = await $login(values)
      console.log(result)
      if (result.success) {
        result.data.token && localStorage.setItem("token", result.data.token)
        Toast.show(result.message)
        // console.log("token:",result.data.userId,result.data.username)
        localStorage.setItem("UID", result.data.userId)
        localStorage.setItem("userName", result.data.username)
        setUID(result.data.userId)
        setUserName(result.data.username)
        console.log(UID, userName)
        window.location.href = "/home"
      } else {
        Toast.show(result.message)
      }
    } catch (error) {
      console.error("登录出错：", error)
      Toast.show("登录出错：" + error.message)
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
          <>
            <Button className={styles.loginButton} block type="submit">
              登录
            </Button>
            <Button className={styles.toHomeButton} block onClick={() => navigate("/home")}>
              进入首页
            </Button>
            <Link to="/register">注册</Link>
          </>
        }>
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
          ]}>
          <Input type="password" className={styles.input} placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  )
}
