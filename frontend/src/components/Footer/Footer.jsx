/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-11 18:16:07
 * @FilePath: \frontend\src\components\Footer\Footer.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaRegPlusSquare, FaEnvelope, FaUser } from 'react-icons/fa';
import "./footer.css";
export default function Footer() {
  const initialSelected = localStorage.getItem("selected") || "home";
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (item) => {
    setSelected(item);
  };

  useEffect(() => {
    localStorage.setItem("selected", selected);
  }, [selected]);
  return (
<div className="footer">
  <Link to="/home" onClick={() => handleSelect("home")} className={selected === "home" ? "selected" : ""}>
    {selected === "home" ? <FaHome size={32} color="FB9AD1" /> : <FaHome size={32} color="#888" />}
  </Link>
  <Link to="/follow" onClick={() => handleSelect("follow")} className={selected === "follow" ? "selected" : ""}>
    {selected === "follow" ? <FaHeart size={32} color="FB9AD1" /> : <FaHeart size={32} color="#888" />}
  </Link>
  {/* 使用单独的布局处理 "发布" 图标 */}
  <div className="special-icon">
    <Link to="/publish" onClick={() => handleSelect("publish")} className="publish">
      <FaRegPlusSquare size={48} color="FB9AD1" />
    </Link>
  </div>
  <Link to="/message" onClick={() => handleSelect("message")} className={selected === "message" ? "selected" : ""}>
    {selected === "message" ? <FaEnvelope size={32} color="FB9AD1" /> : <FaEnvelope size={32} color="#888" />}
  </Link>
  <Link to="/mytravelog" onClick={() => handleSelect("mytravelog")} className={selected === "mytravelog" ? "selected" : ""}>
    {selected === "mytravelog" ? <FaUser size={32} color="FB9AD1" /> : <FaUser size={32} color="#888" />}
  </Link>
</div>
  );
}