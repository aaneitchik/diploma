import { PropTypes } from 'prop-types';

export const categoryShape = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool,
	subcategories: PropTypes.arrayOf(PropTypes.string)
});

export const paginationShape = PropTypes.shape({
	pageNumber: PropTypes.number,
	pageSize: PropTypes.number,
	category: PropTypes.string,
	subcategory: PropTypes.string,
	allowedCategories: PropTypes.arrayOf(PropTypes.string)
});
