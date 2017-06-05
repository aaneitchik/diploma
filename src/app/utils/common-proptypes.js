import { PropTypes } from 'prop-types';

export const locationShape = PropTypes.shape({
	pathname: PropTypes.string
});

export const subcategoryShape = PropTypes.shape({
	name: PropTypes.string
});

export const categoryShape = PropTypes.oneOfType([
	PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string,
		active: PropTypes.bool,
		subcategories: PropTypes.arrayOf(subcategoryShape)
	}),
	PropTypes.string
]);

export const paginationShape = PropTypes.shape({
	pageNumber: PropTypes.number,
	pageSize: PropTypes.number,
	category: PropTypes.string,
	subcategory: PropTypes.string,
	allowedCategories: PropTypes.arrayOf(PropTypes.string)
});

export const fileShape = PropTypes.shape({
	_id: PropTypes.string,
	title: PropTypes.string,
	author: PropTypes.string,
	shortDescription: PropTypes.string,
	description: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string),
	filename: PropTypes.string,
	fileExtension: PropTypes.string
});

export const inputShape = PropTypes.shape({
	name: PropTypes.string,
	value: PropTypes.any, // eslint-disable-line react/forbid-prop-types,
	onChange: PropTypes.func
});

export const userShape = PropTypes.shape({
	email: PropTypes.string
});
