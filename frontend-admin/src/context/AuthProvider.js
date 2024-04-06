import React, { createContext, useState, useContext } from "react"

//role : admin auditor null
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("null")

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider
