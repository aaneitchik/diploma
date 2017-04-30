const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const ROLES = require('../roles');

const userModel = new Schema({
	email: String,
	role: String,
	password: String,
	faculty: String,
	semester: Number,
	recordBook: {
		type: Array,
		default: []
	}
});

userModel.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userModel.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

userModel.methods.isAdmin = function(role) {
	return role === ROLES.ADMIN;
};

module.exports = mongoose.model('User', userModel);