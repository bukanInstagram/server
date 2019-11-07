const { Post } = require('../models');

class PostController {
	static getAllPost(req, res, next) {
		Post.find()
			.then(posts => {
				res.status(200).json(posts);
			})
			.catch(next);
	}

	static addPost(req, res, next) {
		Post.create({
			author: req.payload.username,
			img: req.body.img,
			title: req.body.title,
			desc: req.body.desc,
			tags: req.body.tags
		})
			.then(post => {
				res.status(201).json(post);
			})
			.catch(next);
	}

	static deletePost(req, res, next) {
		Post.findOneAndDelete({ id: req.params.id })
			.then(post => {
				res.status(204).json();
			})
			.catch(next);
	}
}

module.exports = PostController;
