/*
 * @Author: Sueyuki 2574397962@qq.com
 * @Date: 2024-04-02 19:17:09
 * @LastEditors: Sueyuki 2574397962@qq.com
 * @LastEditTime: 2024-04-19 08:48:45
 * @FilePath: \frontend\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "./App.css"
import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import MyTravelog from "./pages/MyTravelog/MyTravelog"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import ConditionalFooter from "./ConditionalFooter"
import Publish from "./pages/Publish/Publish"
import Detaillog from "./pages/Detaillog/Detaillog"
import PreviewPage from "./pages/PreviewPage/PreviewPage"
import { UserContextProvider } from "./Context/UserContext"

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="app-container">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/travelogs/:id" element={<Detaillog />}></Route>
            <Route path="/mytravelog" element={<MyTravelog />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
            <Route path="/update/:targetTravelogId" element={<Publish />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/previewpage/:data" element={<PreviewPage />}></Route>
          </Routes>
        </div>
        <ConditionalFooter />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
