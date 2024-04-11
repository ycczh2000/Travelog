const jwt = require("jsonwebtoken")
let secret = "fawgf1awi7owa35"

//不存在token时直接跳过，将userId，role附加到req上，之后根据这两个字段来判断用户的登录状态和权限
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
