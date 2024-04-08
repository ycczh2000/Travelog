/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-08 19:04:09
 * @FilePath: \frontend\src\components\Footer\Footer.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHouse, GiHeartEarrings, GiPawHeart, GiReceiveMoney, GiBabyBottle } from "react-icons/gi";
import "./footer.css";

export default function Footer() {
  const [selected, setSelected] = useState(""); // 默认选择首页

  const handleSelect = (item) => {
    setSelected(item);
  };
  return (
    <div className="footer">
      <Link to="/home" onClick={() => handleSelect("home")} className={selected === "home" ? "selected" : ""}>
        {selected === "home" ? <GiHouse size={32} color="#ff7f50" /> : <GiHouse size={32} color="#888" />}
      </Link>
      <Link to="/follow" onClick={() => handleSelect("follow")} className={selected === "follow" ? "selected" : ""}>
        {selected === "follow" ? <GiHeartEarrings size={32} color="#ff7f50" /> : <GiHeartEarrings size={32} color="#888" />}
      </Link>
      {/* 使用单独的布局处理 "发布" 图标 */}
      <div className="special-icon">
        <Link to="/publish" onClick={() => handleSelect("publish")} className="publish">
          <GiPawHeart size={56} color="#ff7f50" />
        </Link>
      </div>
      <Link to="/message" onClick={() => handleSelect("message")} className={selected === "message" ? "selected" : ""}>
        {selected === "message" ? <GiReceiveMoney size={32} color="#ff7f50" /> : <GiReceiveMoney size={32} color="#888" />}
      </Link>
      <Link to="/mytravelog" onClick={() => handleSelect("mytravelog")} className={selected === "mytravelog" ? "selected" : ""}>
        {selected === "mytravelog" ? <GiBabyBottle size={32} color="#ff7f50" /> : <GiBabyBottle size={32} color="#888" />}
      </Link>
    </div>
  );
}