const { Comment, Post } = require('../models');

class CommentController {
	// static getAllComment(req, res, next) {
	// 	Comment.find({ UserId: req.payload.id })
	// 		.then(comments => {
	// 			res.status(200).json(comments);
	// 		})
	// 		.catch(next);
	// }

	static addComment(req, res, next) {
		Comment.create({
			UserId: req.payload.id,
			content: req.body.content
		})
			.then(comment => {
				return Post.findByIdAndUpdate(req.params.id, {
					$push: { comments: comment.id }
				});
			})
			.then(post => {
				res.status(201).json(post);
			})
			.catch(next);
	}
}

module.exports = CommentController;
