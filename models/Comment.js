const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
	UserId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: [true, 'Comment content required']
	}
});

module.exports = model('Comment', commentSchema);
