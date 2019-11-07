const routes = require('express').Router();

routes.use('/posts', require('./posts'));
routes.use('/users', require('./users'));
routes.use('/comments', require('./comments'));

module.exports = routes;
