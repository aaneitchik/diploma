const Category = require('../models/category.model');

exports.getAllCategories = res => {
	Category.find((err, categories) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(categories);
		}
	});
};
