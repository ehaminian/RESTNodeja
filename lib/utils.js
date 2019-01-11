const config = require("../expressfile")
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const _ = require("lodash")

function saltHashPassword({
  password,
  salt = randomString()
}) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
};

function randomString() {
  return crypto.randomBytes(4).toString('hex')
};

function createJwtToken(user) {

  let token = jwt.sign({
     data: {
       id: user.id,
       email: user.email,
       grants: user.grants
     }
    }, config.jwt_secret, {
      expiresIn: config.jwt_max_age,
      algorithm: 'HS256'
  })

  return token

};

function verifyJwtToken(token) {

  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt_secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      } resolve(decodedToken)
    })
  })

}

module.exports = {
  saltHashPassword,
  randomString,
  createJwtToken,
  verifyJwtToken
}
