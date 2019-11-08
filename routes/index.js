const routes = require('express').Router();
const images = require('../helpers/images');

routes.get('/checkauth');
routes.use('/posts', require('./posts'));
routes.use('/users', require('./users'));
routes.use('/comments', require('./comments'));
routes.post('/upload', images.multer.single('image'), images.sendUploadToGCS, (req, res) => {
	res.send({
		status: 200,
		message: 'Your file is successfully uploaded',
		link: req.file.cloudStoragePublicUrl
	});
});

module.exports = routes;
