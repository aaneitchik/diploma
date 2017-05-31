const LocalStrategy = require('passport-local');

const User = require('../server/models/user.model');
const ROLES = require('../server/roles');

module.exports = function(passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, email, password, done) => {
				process.nextTick(() => {
					User.findOne({ email }, (err, user) => {
						if (err) return done(err);
						if (user) {
							return done(
								null,
								false,
								req.flash(
									'signupMessage',
									'That email is already taken.'
								)
							);
						}
						const newUser = new User();

						newUser.email = email;
						newUser.password = newUser.generateHash(password);
						newUser.role = ROLES.USER;

						// save the user
						newUser.save(err => {
							if (err) throw err;
							return done(null, newUser);
						});
					});
				});
			}
		)
	);

	passport.use(
		'local-login',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req, email, password, done) => {
				// callback with email and password from our form

				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				User.findOne({ email }, (err, user) => {
					// if there are any errors, return the error before anything else
					if (err) return done(err);

					// if no user is found, return the message
					if (!user)
						return done(
							null,
							false,
							req.flash('loginMessage', 'No user found.')
						); // req.flash is the way to set flashdata using connect-flash

					// if the user is found but the password is wrong
					if (!user.validPassword(password))
						return done(
							null,
							false,
							req.flash('loginMessage', 'Oops! Wrong password.')
						); // create the loginMessage and save it to session as flashdata

					// all is well, return successful user
					return done(null, user);
				});
			}
		)
	);
};
