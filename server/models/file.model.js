const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const searchPlugin = require('mongoose-search-plugin');

const fileModel = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		default: []
	},
	category: {
		type: String,
		required: true,
		default: 'Other'
	},
	subcategory: {
		type: String,
		required: true,
		default: 'Other'
	},
	publicationPlace: {
		type: String
	},
	publicationYear: {
		type: Number,
		min: 1000,
		max: 2100
	},
	shortDescription: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	rating: {
		type: Object,
		default: {}
	},
	ratingSum: {
		type: Number,
		default: 0
	},
	downloaded: {
		type: Number,
		default: 0
	},
	filepath: {
		type: String,
		required: true
	},
	filename: {
		type: String,
		required: true
	},
	fileExtension: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

fileModel.plugin(mongoosePaginate);
fileModel.plugin(searchPlugin, {
	fields: [
		'title',
		'author',
		'shortDescription',
		'description',
		'fileExtension',
		'category',
		'subcategory',
		'publicationPlace'
	]
});

module.exports = mongoose.model('File', fileModel);
