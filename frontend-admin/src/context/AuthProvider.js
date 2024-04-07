import React, { createContext, useState, useContext } from "react"

//role : admin auditor null
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  // const [userInfo,setUserInfo] = useState({ username: undefined,role: undefined })
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
