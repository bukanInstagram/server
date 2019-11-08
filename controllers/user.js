const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class UserController {
	static register(req, res, next) {
		let { username, email, password } = req.body;
		let userData = { username, email, password };
		User.create(userData)
			.then(user => {
				res.status(201).json(user);
			})
			.catch(next);
	}

	static login(req, res, next) {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user && bcrypt.compare(req.body.password, user.password)) {
					let access_token = jwt.generate({ id: user._id, email: user.email });
					res.status(200).json({
						access_token,
						user: user.username
					});
				} else {
					throw { code: 401, message: 'Email or Password is incorrect' };
				}
			})
			.catch(next);
	}
}

module.exports = UserController;
