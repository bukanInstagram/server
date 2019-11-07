const User = require('../models/User')
const jwt = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    let verified = jwt.verify(req.headers.access_token)
    req.payload = verified
    User.findOne({ _id: req.payload.id })
      .then(result => {
        if (result) {
          next()
        } else {
          let err = new Error('User is not found')
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  } catch (err) {
    err.code = 403
    next(err)
  }
}