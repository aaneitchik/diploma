const express = require('express');
const passport = require('passport');

const fileCtrl = require('../controllers/file.controller');
const categoryCtrl = require('../controllers/category.controller');
const isLoggedIn = require('../middleware/is-logged-in');

const fileRouter = express.Router();
require('../../config/passport')(passport);

// download file
fileRouter.route('/download/:id').get(isLoggedIn, (req, res) => {
	const id = req.params.id;
	return fileCtrl.downloadFile(res, id);
});

// open pdf
fileRouter.route('/open_pdf/:id').get(isLoggedIn, (req, res) => {
	const id = req.params.id;
	const pdfFile = true;
	return fileCtrl.downloadFile(res, id, pdfFile);
});

// get all categories
fileRouter
	.route('/categories')
	.get(isLoggedIn, (req, res) => categoryCtrl.getAllCategories(res));

// get file by id
fileRouter.route('/:id').get(isLoggedIn, (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;
	return fileCtrl.getFileById(res, id, userId);
});

// get files by page
fileRouter.route('').post(isLoggedIn, (req, res) => {
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
