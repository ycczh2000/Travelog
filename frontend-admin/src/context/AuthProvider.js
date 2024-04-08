import React, { createContext, useState, useContext } from "react"

//role : admin auditor null
//尝试从sessionStorage中获取用户信息，如果没有则设置为null
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const storedUserInfo = sessionStorage.getItem("userInfo")
  const initialUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : { username: null, role: null }

  const [userInfo, setUserInfo] = useState(initialUserInfo)
  const updateUserInfo = newUserInfo => {
    setUserInfo(newUserInfo)
    sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo))
  }

  return <AuthContext.Provider value={{ userInfo, setUserInfo: updateUserInfo }}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider
