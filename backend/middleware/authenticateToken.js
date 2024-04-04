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

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]
  if (token === undefined) return next()
  jwt.verify(token, secret, (err, code) => {
    if (err) {
      return next()
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
