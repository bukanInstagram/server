const Comment = require('../models/Comment')

module.exports = (req, res, next) => {
  Comment.findOne({ _id: req.params.id})
    .then(comment => {
      if(!comment) {
        let err = new Error('Post is not found')
        err.code = 400
        throw err
      } else {
        if(comment.UserId == req.payload.id) {
          next()
        } else {
          let err = new Error ('You are not authorized')
          err.code = 403
          throw err
        }
      }
    })
    .catch(err => {
      next (err)
    })
}