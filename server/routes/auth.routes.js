const express = require('express');
const passport = require('passport');

const authRouter = express.Router();
require('../../config/passport')(passport);

authRouter
	.route('/login')
	.post(passport.authenticate('local-login'), (req, res) => {
		res.status(200).send({
			email: req.user.email,
			role: req.user.role,
			faculty: req.user.faculty,
			semester: req.user.semester,
			recordBook: req.user.recordBook
		});
	});

authRouter.route('/login_with_cookies').post((req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).send({
			email: req.user.email,
			role: req.user.role,
			faculty: req.user.faculty,
			semester: req.user.semester,
			recordBook: req.user.recordBook
		});
	}
	return next();
});

module.exports = authRouter;
