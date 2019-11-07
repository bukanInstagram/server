const { Schema, model, models } = require('mongoose');
const bcrypt = require('../helpers/bcrypt');

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Please input your email'],
		validate: [
			{
				validator: function(v) {
					let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					return emailRegex.test(v);
				},
				message: props => `${props.value} is not a valid email address`
			},
			{
				validator(v) {
					return models.User.findOne({ email: v }).then(user => {
						console.log(user);
						if (user) return false;
						else return true;
					});
				},
				msg: 'Email already registered'
			}
		]
	},
	username: {
		type: String,
		required: [true, 'Please input your username'],
		validate: {
			validator(v) {
				return models.User.findOne({ username: v }).then(user => {
					if (user) return false;
					else return true;
				});
			},
			msg: 'Username already taken'
		}
	},
	password: {
		type: String,
		required: [true, 'Please input your password'],
		minlength: [6, 'Please input minimum 6 characters']
	}
});

userSchema.pre('save', function(next) {
	this.email = this.email.toLowerCase();
	this.password = bcrypt.hash(this.password);
	next();
});

const User = model('User', userSchema);

module.exports = User;
