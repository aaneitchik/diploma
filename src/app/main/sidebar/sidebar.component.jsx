import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import {
	getCategories,
	toggleCategory,
	selectSubcategory,
	selectAll
} from './sidebar';

import Category from './category.component';

import * as shapes from '../../utils/common-proptypes';

class Sidebar extends React.Component {
	componentDidMount() {
		this.props.getCategories();
	}
	onCategoryClick = (categoryIndex, category) => {
		this.props.toggleCategory(
			categoryIndex,
			category,
			this.props.pagination
		);
	};
	onSubcategoryClick = subcategoryIndex => {
		this.props.selectSubcategory(subcategoryIndex);
	};
	selectAll = () => {
		this.props.selectAll(this.props.pagination);
	};
	render() {
		const categories = this.props.categories.map((category, index) => (
			<Category
				key={category.name}
				index={index}
				category={category}
				onCategoryClick={this.onCategoryClick}
				onSubcategoryClick={this.onSubcategoryClick}
			/>
		));
		return (
			<div className={`uk-offcanvas-bar ${this.props.className}`}>
				<a
					className={`category ${this.props.selectedCategory === 'All' ? 'active' : ''}`}
					onClick={this.selectAll}
				>
					All
				</a>
				<hr className="divider" />
				<ul className="categories">{categories}</ul>
			</div>
		);
	}
}

Sidebar.defaultProps = {
	className: ''
};

Sidebar.propTypes = {
	categories: PropTypes.arrayOf(
		shapes.categoryShape
	).isRequired,
	className: PropTypes.string,
	getCategories: PropTypes.func.isRequired,
	pagination: shapes.paginationShape.isRequired,
	selectAll: PropTypes.func.isRequired,
	selectedCategory: PropTypes.oneOfType([PropTypes.string, shapes.categoryShape]).isRequired,
	selectSubcategory: PropTypes.func.isRequired,
	toggleCategory: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.sidebar.categories,
		pagination: state.browse.pagination,
		selectedCategory: state.sidebar.selectedCategory
	};
}

export default connect(mapStateToProps, {
	getCategories,
	toggleCategory,
	selectSubcategory,
	selectAll
})(
	styled(Sidebar)`
	background-color: rgba(255, 255, 255, 0.9);
	text-transform: uppercase;
	
	.divider {
		border-top-color: ${props => props.theme.primaryColor} !important;
	}
	
	.categories {
		padding-left: 0;
	}
	
	.category {
		color: ${props => props.theme.textColor} !important;
		font-size: 1rem;
		font-weight: bold;
		text-decoration: none;
	}
	
	.category.active {
		color: ${props => props.theme.darkPrimaryColor} !important;
	}
	`
);
