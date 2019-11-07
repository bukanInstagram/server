const comments = require('express').Router();
const { CommentController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');

comments.use(authenticate);
comments.post('/:id', CommentController.addComment);
// comments.patch('/:id', CommentController.editComment);
// comments.delete('/:id', CommentController.deleteComment);

module.exports = comments;
