import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AppLayout from "./views/AppLayout/AppLayout"
import Login from "./views/Login/Login"
import Task from "./views/Task/Task"
import Register from "./views/Register/Register"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/layout" element={<AppLayout />}>
            <Route path="task" element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
