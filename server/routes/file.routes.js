const express = require('express');
const passport = require('passport');

const fileCtrl = require('../controllers/file.controller');
const isLoggedIn = require('../middleware/is-logged-in');
const fileRouter = express.Router();
require('../../config/passport')(passport);

//get file by id
fileRouter.route('/:id')
	.get(isLoggedIn, function(req, res) {
		const { id } = req.params;
		const userId = req.user._id;
		return fileCtrl.getFileById(res, id, userId);
	});

//get files by page
fileRouter.route('').post(isLoggedIn, function(req, res) {
	const {
		pageNumber,
		pageSize,
		category,
		subcategory,
		availableCategories
	} = req.body;
	return fileCtrl.getFilesByPage(
		res,
		pageNumber,
		pageSize,
		category,
		subcategory,
		availableCategories
	);
});

module.exports = fileRouter;
