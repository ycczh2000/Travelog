import React from "react"
import "./footer.css"
import { AddOutline, UserCircleOutline, ShopbagOutline } from "antd-mobile-icons"
export default function Footer() {
  return (
    <div className="footer">
      <ShopbagOutline fontSize={24} color="var(--adm-color-weak)" />
      <div className="upload-btn">
        <AddOutline fontSize={24} color="var(--adm-color-weak)" onClick={() => console.log("add")} />
      </div>
      <UserCircleOutline fontSize={24} color="var(--adm-color-weak)" />
    </div>
  )
}
