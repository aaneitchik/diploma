const fs = require('fs');
const express = require('express');
const passport = require('passport');
const multer = require('multer');
const AWS = require('aws-sdk');

const fileCtrl = require('../controllers/file.controller');
const categoryCtrl = require('../controllers/category.controller');
const isLoggedIn = require('../middleware/is-logged-in');

const fileRouter = express.Router();
require('../../config/passport')(passport);

const storageConfig = require('../../config/storage');

const upload = multer({ storage: storageConfig });

AWS.config.loadFromPath('./config/s3.json');

const s3Config = require('../../config/s3');

// upload file to s3
fileRouter.use(
	'/s3',
	require('react-s3-uploader/s3router')({
		bucket: s3Config.bucket,
		region: s3Config.region, // optional
		signatureVersion: 'v4', // optional (use for some amazon regions: frankfurt and others)
		headers: { 'Access-Control-Allow-Origin': '*' }, // optional
		ACL: 'public-read', // this is default
		uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
	})
);

// load file to the lib
fileRouter.post('/upload', upload.single('file'), (req, res) => {
	const fileInfo = JSON.parse(req.body.fileInfo);
	const file = req.file;
	return fileCtrl.addFile(res, fileInfo, file);
});

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

// find files by query
fileRouter.route('/find').post(isLoggedIn, (req, res) => {
	const query = req.body;
	return fileCtrl.findFiles(res, query);
});

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
