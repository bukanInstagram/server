const posts = require('express').Router();
const { PostController } = require('../controllers');

posts.get('/', PostController.getAllPost);

module.exports = posts;
