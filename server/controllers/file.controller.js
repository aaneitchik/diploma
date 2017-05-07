const fs = require('fs');
const nodemailer = require('nodemailer');

const File = require('../models/file.model');

const filePath = './uploads/';

const smtpTransport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'bsudigitallib@gmail.com',
		pass: 'justareallystrongpassword'
	}
});

exports.addFile = addFile;
exports.deleteFileById = deleteFileById;
exports.downloadFile = downloadFile;
exports.editFileById = editFileById;
exports.findFiles = findFiles;
exports.getFiles = getFiles;
exports.getFileById = getFileById;
exports.getFilesByPage = getFilesByPage;
exports.sendFileByMail = sendFileByMail;
exports.setRating = setRating;

// add file
function addFile(res, fileInfo, file) {
	const newFile = new File({
		title: fileInfo.title,
		author: fileInfo.author,
		tags: fileInfo.tags,
		category: fileInfo.category,
		subcategory: fileInfo.subcategory,
		publicationYear: fileInfo.publicationYear || null,
		publicationPlace: fileInfo.publicationPlace || null,
		shortDescription: fileInfo.shortDescription,
		description: fileInfo.description,
		filepath: `${file.destination}/${file.originalname}`,
		filename: file.originalname,
		fileExtension: getFileExtension(file.originalname)
	});
	newFile.save(err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send('File created successfully!');
		}
	});
}

// delete file by id
function deleteFileById(res, id) {
	File.findByIdAndRemove(id, err => {
		if (err) {
			res.status(500).send();
		} else {
			res.status(200).send();
		}
	});
}

// edit file info
function editFileById(res, id, fileInfo) {
	const toUpdate = {
		title: fileInfo.title,
		author: fileInfo.author,
		tags: fileInfo.tags,
		category: fileInfo.category,
		subcategory: fileInfo.subcategory,
		publicationYear: null,
		publicationPlace: null,
		shortDescription: fileInfo.shortDescription,
		description: fileInfo.description
	};
	File.update({ _id: id }, toUpdate, err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send();
		}
	});
}

// find files
function findFiles(res, searchQuery) {
	const query = constructSearchQuery(searchQuery);
	File.find(query, (err, results) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(results);
		}
	});
}

// get all files
function getFiles(res, categories) {
	File.find({ category: { $in: categories } }, (err, files) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(files);
		}
	});
}

function getFileById(res, id, userId) {
	File.findById(id)
		.exec()
		.then(file => {
			const fileinfo = file.toObject();
			fileinfo.canBeRated = file.rating ? !file.rating[userId] : true;
			fileinfo.rating = calcRating(file.rating, file.ratingSum);
			res.json(fileinfo);
		})
		.catch(err => res.status(500).send(err));
}

function getFilesByPage(
	res,
	pageNumber,
	pageSize,
	category,
	subcategory,
	availableCategories
) {
	const query = constructCategoryQuery(
		category,
		subcategory,
		availableCategories
	);
	File.paginate(
		query,
		{ page: pageNumber, limit: pageSize, sortBy: { ratingSum: -1 } },
		(err, files) => {
			if (err) {
				res.status(500).send(err);
			} else {
				const result = Object.assign({}, files);
				result.docs = result.docs.map(file => {
					const newFile = file.toObject();
					newFile.rating = calcRating(file.rating, file.ratingSum);
					return newFile;
				});
				res.json(files);
			}
		}
	);
}

function downloadFile(res, id, pdfFile) {
	File.findById(id).exec((err, file) => {
		if (err) {
			res.status(500).send(err);
		} else {
			File.update({ _id: file._id }, { $inc: { downloaded: 1 } })
				.exec()
				.then(() => {
					const fileToDownload = fs.readFileSync(
						file.filepath,
						'binary'
					);
					const buffer = new Buffer(fileToDownload, 'binary');
					const stat = fs.statSync(filePath + file.filename);
					const contentType = `application/${pdfFile ? 'pdf' : 'octet-stream'}`;
					const contentDisposition = `${pdfFile ? 'inline' : 'attachment'}; filename=${file.filename}`;
					res.setHeader('Content-Length', stat.size);
					res.setHeader('Content-Type', contentType);
					res.setHeader('Content-Disposition', contentDisposition);
					res.end(buffer);
				});
		}
	});
}

function base64_encode(destination, filepath) {
	// need this prefix to download from frontend
	const prefix = 'data:;base64,';
	// read binary data
	const bitmap = fs.readFileSync(`${destination}/${filepath}`);
	const base64 = new Buffer(bitmap, 'binary').toString('base64');
	return prefix + base64;
}

function constructCategoryQuery(category, subcategory, availableCategories) {
	let query = {};
	if (category === 'All') {
		query = { category: { $in: availableCategories } };
	} else if (subcategory === 'All') {
		query = { category };
	} else {
		query = { category, subcategory };
	}
	return query;
}

function constructSearchQuery(searchQuery) {
	const query = {};
	Object.keys(searchQuery).forEach(key => {
		if (key === 'category') {
			if (searchQuery[key] === 'All') {
				return;
			}
		}
		if (key === 'subcategory') {
			if (searchQuery.category === 'All') {
				return;
			}
			query.category = searchQuery.category;
			if (!(searchQuery[key] === 'All')) {
				query[key] = searchQuery[key];
			}
			return;
		}
		if (
			!(!searchQuery[key] ||
				searchQuery[key] === '0' ||
				((typeof searchQuery[key] === 'string' ||
					searchQuery[key] instanceof String) &&
					!searchQuery[key].trim()))
		) {
			query[key] = { $regex: new RegExp(searchQuery[key], 'i') };
		}
	});
	return query;
}

function sendFileByMail(res, fileId, email) {
	File.findById(fileId, (err, file) => {
		if (err) {
			res.status(500).send(err);
		} else {
			File.update({ _id: file._id }, { $inc: { downloaded: 1 } })
				.exec()
				.then(() => {
					const mailOptions = {
						from: 'BSU Lib <bsudigitallib@gmail.com>',
						to: email,
						subject: `Your requested file: ${file.filename}`,
						text: "Here's the requested file, as promised :)",
						attachments: [
							{
								path: file.filepath
							}
						]
					};

					smtpTransport.sendMail(mailOptions);

					res.status(200).send('Your request is accepted.');
				});
		}
	});
}

function setRating(res, fileId, rating, userId) {
	return File.findById(fileId)
		.exec()
		.then(file => {
			const ratingToSet = file.rating;
			ratingToSet[userId] = rating;
			const ratingSum = file.ratingSum + rating;
			return File.update(
				{ _id: fileId },
				{ rating: ratingToSet, ratingSum }
			)
				.exec()
				.then(() => {
					res.json(calcRating(ratingToSet, ratingSum));
				});
		})
		.catch(err => {
			res.status(500).send(err);
		});
}

function calcRating(ratingObject, ratingSum) {
	const users = Object.keys(ratingObject);
	return users.length ? ratingSum / users.length : 0;
}

function getFileExtension(filename) {
	const extension = filename.split('.');
	return extension[extension.length - 1];
}
