import "./App.css"
import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import MyTravelog from "./pages/MyTravelog/MyTravelog"
import Footer from "./components/Footer/Footer"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import AvatarUpload from "./pages/AvatarUpload/AvatarUpload"
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/travelog/:id" element={<div />}></Route>
          <Route path="/mytravelog" element={<MyTravelog />}></Route>
          <Route path="/mytravelog/:id" element={<div />}></Route>
          <Route path="/publish" element={<div />}></Route>
          <Route path="/avatarupload" element={<AvatarUpload />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
