const posts = require('express').Router();
const { PostController } = require('../controllers');

posts.get('/', PostController.getAllPost);
posts.post('/', PostController.addPost);
posts.patch('/:id', PostController.likePost);
posts.delete('/:id', PostController.deletePost);

module.exports = posts;
