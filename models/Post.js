const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	UserId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	img: {
		type: String,
		required: [true, 'Image URL required']
	},
	title: {
		type: String,
		required: [true, 'Post title required']
	},
	desc: {
		type: String
	},
	tag: {
		type: String,
		enum: ['tag', 'name']
	},
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = model('Post', postSchema);
