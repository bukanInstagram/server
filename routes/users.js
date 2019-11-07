const users = require('express').Router();
const { UserController } = require('../controllers');

users.post('/register', UserController.register);
users.post('/login', UserController.login);

module.exports = users;