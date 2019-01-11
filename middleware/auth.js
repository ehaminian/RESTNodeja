const config = require("../expressfile")
const auth = require("../models/auth")
const { verifyJwtToken, saltHashPassword, createJwtToken } = require("../lib/utils")

function login(req, res) {
  const { email, password } = req.body
  auth.getUserByEmail({ email }).then((user) => {
    const { hash } = saltHashPassword({
      password,
      salt: user.salt
    })
    if(hash === user.password) {
      let token = createJwtToken(user);
      res.status(200).json({ token, expiresIn: config.jwt_max_age })
    }
  }).catch((err) => {
    res.status(500).json({ err })
  })

}

function bearer_jwt_token(req, res, next) {
  const unauthorized = { message: 'Format is Authorization: Bearer [token]' }
  const badRequest = { message: "Invalid Token" }
  if (req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      let scheme = parts[0];
      let token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        verifyJwtToken(token).then((decoded) => {
          req.user = decoded.data
          if (req.user.id) {
            next()
          } else  {
            res.status(400).json(badRequest)
          }
        }).catch((err) => {
          res.status(400).json(badRequest)
        })
      }
    } else {
      res.status(401).json(unauthorized)
    }
  } else {
    res.status(401).json(unauthorized)
  }
}
module.exports = {
  login, 
  bearer_jwt_token
}