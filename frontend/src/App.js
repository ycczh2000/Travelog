import "./App.css"
import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import MyTravelog from "./pages/MyTravelog/MyTravelog"

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import AvatarUpload from "./pages/AvatarUpload/AvatarUpload"
import ConditionalFooter from "./ConditionalFooter"
import UserSpace from "./pages/UserSpace/UserSpace"
import UserTravelogs from "./pages/UserTravelogs/UserTravelogs"
import Publish from "./pages/Publish/Publish"
import Detaillog from "./pages/Detaillog/Detaillog"

import { UserContextProvider } from "./Context/UserContext"

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="app-container">
          <Routes>
            {/* <CacheSwitch>
            <CacheRoute exact path="/" component={Home} />
          </CacheSwitch> */}
            <Route path="/home" element={<Home />}></Route>
            {/* <Route path="/travelogs/:id" element={<Detaillog />}></Route> */}
            <Route path="/travelogs/:id" element={<Detaillog />}></Route>
            <Route path="/space/:username" element={<UserSpace />}>
              <Route path="travelog" element={<UserTravelogs />}></Route>
            </Route>
            <Route path="/mytravelog" element={<MyTravelog />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
            <Route path="/update/:targetTravelogId" element={<Publish />}></Route>
            <Route path="/avatarupload" element={<AvatarUpload />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
        <ConditionalFooter />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
