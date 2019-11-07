const posts = require('express').Router();
const { PostController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');
const postAuthorize = require('../middlewares/postAuthorize');

posts.get('/', PostController.getAllPost);
posts.use(authenticate);
posts.post('/', PostController.addPost);
posts.use('/:id', postAuthorize);
posts.patch('/:id', PostController.likePost);
posts.delete('/:id', PostController.deletePost);

module.exports = posts;
