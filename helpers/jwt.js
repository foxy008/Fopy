const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET

const signToken = (data) => {

  return jwt.sign(data, SECRET);
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, verifyToken }
