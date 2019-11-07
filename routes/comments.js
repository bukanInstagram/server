const comments = require('express').Router();
const { CommentController } = require('../controllers');

comments.post('/', CommentController.addComment);
// comments.patch('/:id', CommentController.editComment);
// comments.delete('/:id', CommentController.deleteComment);

module.exports = comments;