const Post = require('../models/Post')

module.exports = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
    .then(post => {
      if(!post) {
        let err = new Error('Post is not found')
        err.code = 400
        throw err
      } else {
        if(post.UserId == req.payload.id) {
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