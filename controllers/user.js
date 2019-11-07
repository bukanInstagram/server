const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class UserController {
	static register(req, res, next) {
		let { username, email, password } = req.body;
		let userData = { username, email, password };
		User.findOne({ email })
			.then(user => {
				if (user) {
					let err = new Error('Email is already in use');
					err.code = 400;
					throw err;
				} else {
					return User.create(userData);
				}
			})
			.then(user => {
				res.status(201).json(user);
			})
			.catch(err => {
				next(err);
			});
	}

	static login(req, res, next) {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					throw new Error('User is not found');
				}
				let isCorrect = bcrypt.compare(req.body.password, user.password);
				if (user && isCorrect) {
					let jwtToken = jwt.generate({ id: user._id, email: user.email });
					res.status(200).json({
						jwtToken
					});
				} else {
					let err = new Error('Email or Password is incorrect');
					err.code = 401;
					next(err);
				}
			})
			.catch(err => {
				next(err);
			});
	}
}

module.exports = UserController;
