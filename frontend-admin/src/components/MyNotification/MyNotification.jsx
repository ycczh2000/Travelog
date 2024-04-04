import React, { useEffect } from "react"
import { notification } from "antd"

// NotiMsg{type:'success'|'error',massage:'系统通知',description:bool}
export default function My_Notification({ notiMsg }) {
  const [api, contextHolder] = notification.useNotification()
  useEffect(() => {
    if (notiMsg.type) {
      api[notiMsg.type]({
        message: "系统通知",
        description: notiMsg.description,
      })
    }
  }, [notiMsg])

  return <>{contextHolder}</>
}
