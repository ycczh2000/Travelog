const path = require("path")
const express = require("express")
require("express-async-errors")
const cors = require("cors")

const authenticateToken = require("./middleware/authenticateToken")
const errorHandler = require("./middleware/errorHandler")
const travelogRoutes = require("./routes/travelogRoutes")
const userRoutes = require("./routes/userRoutes")
const adminUserRouter = require("./routes/adminUserRouters")

//在远程端改为用权限为可写的用户连接，该用户不会暴露在github上。对外有一个只读用户，写在文档中
//连接本地数据库。
const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/TravelogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())
app.use(authenticateToken) //jwt验证中间件

app.use(travelogRoutes) //游记相关接口
app.use(userRoutes) //用户相关接口
app.use("/admin", adminUserRouter) //PC端审核页面相关接口
app.use("/images", express.static(path.join(__dirname, "uploads")))

app.use(errorHandler) //错误处理中间件

port = 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
