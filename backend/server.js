const path = require("path")
const express = require("express")
require("express-async-errors") //自动捕获异步错误
const cors = require("cors")

const authenticateToken = require("./middleware/authenticateToken")
const errorHandler = require("./middleware/errorHandler")
const travelogRoutes = require("./routes/travelogRoutes")
const userRoutes = require("./routes/userRoutes")
const adminUserRouter = require("./routes/adminUserRouters")

const mongoose = require("mongoose")
const User = require("./models/User")
const Travelog = require("./models/Travelog")

mongoose
  .connect("mongodb://localhost:27017/TravelogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())
app.use(authenticateToken)

app.use(travelogRoutes)
app.use(userRoutes)
app.use("/admin", adminUserRouter)
app.use("/images", express.static(path.join(__dirname, "uploads")))

app.use(errorHandler)

port = 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
