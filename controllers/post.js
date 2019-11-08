const { Post } = require('../models');

class PostController {
	static getAllPost(req, res, next) {
		Post.find()
			.populate('comments')
			.populate('UserId')
			.then(posts => {
				res.status(200).json(posts);
			})
			.catch(next);
	}

	static addPost(req, res, next) {
		Post.create({
			UserId: req.payload.id,
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
		Post.findByIdAndDelete(req.params.id)
			.then(post => {
				res.status(204).json();
			})
			.catch(next);
	}

	static likePost(req, res, next) {
		Post.findById(req.params.id)
		.then(data=>{
			if(data.likes.includes(req.payload.id)){
				next({
					code : 400,
					message : 'already like the post'
				})
			}else{
				return Post.findByIdAndUpdate(req.params.id, {
					$push: { likes: req.payload.id }
				})
			}
		})
			.then(post => {
				res.status(200).json(post);
			})
			.catch(next);
	}
}

module.exports = PostController;
