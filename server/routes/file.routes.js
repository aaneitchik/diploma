const express = require('express');
const passport = require('passport');

const fileCtrl = require('../controllers/file.controller');
const isLoggedIn = require('../middleware/is-logged-in');
const fileRouter = express.Router();
require('../../config/passport')(passport);

//get number of files
fileRouter
	.route('/files_number/:category/:subcategory')
	.get(isLoggedIn, function(req, res) {
		const { category, subcategory } = req.params;
		return fileCtrl.getNumberOfFiles(res, category, subcategory);
	});

//get files by page
fileRouter.route('/files').post(isLoggedIn, function(req, res) {
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
