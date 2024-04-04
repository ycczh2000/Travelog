import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AppLayout from "./views/AppLayout/AppLayout"
import Login from "./views/Login/Login"
import Travelog from "./views/Travelog/Travelog"
import Register from "./views/Register/Register"
import Detail from "./views/Detail/Detail"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/layout" element={<AppLayout />}>
            <Route path="travelog/:id" element={<Detail />} />
            <Route path="travelog" element={<Travelog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
