const jwt = require('jsonwebtoken')
const torch = require('torch')

const {SECRET_JSON_KEY} = process.env

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] 
    const decoded = jwt.verify(token, SECRET_JSON_KEY)
    req.userData = decoded
    next()
  }

  catch (error) {
    console.log(error)
    return res.status(401).json({
      message: 'Auth failed',
      error: error
    })
  }
}