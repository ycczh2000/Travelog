const jwt = require("jsonwebtoken")
let secret = "fawgf1awi7owa35"

const token = jwt.sign({ _id: "66062bf0537e9aa870110177" }, secret, { expiresIn: "30h" })
const out = jwt.verify(token, secret)
console.log("测试用token与out")
console.log("token:  ", token)
console.log("out:  ", out)

const admintoken = jwt.sign({ _id: "660e40ba875ec601b613615c", role: "admin" }, secret, { expiresIn: "500h" })
const admintokenout = jwt.verify(admintoken, secret)
console.log("测试用admintoken")
console.log("admintoken:  ", admintoken)

//这里的实现不太合理，不存在token时直接跳过，然后在每个接口中根据req中userId和role的存在性来判断用户的登录状态和权限
//实际应该在不存在token时返回直接401，只在需要登录验证的地方引入这个中间件
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]
  if (token === undefined) return next()
  jwt.verify(token, secret, (err, code) => {
    if (err) {
      return next(err)
    }
    req.userId = code._id
    if (code.role) {
      req.role = code.role
    }
    console.log("req.userId:  ", req.userId, "req.role:  ", req.role)
    next()
  })
}

module.exports = authenticateToken
