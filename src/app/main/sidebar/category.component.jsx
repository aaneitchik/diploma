import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Subcategory from './subcategory.component';
import * as shapes from '../../utils/common-proptypes';

class Category extends React.Component {
	onClick = () => {
		this.props.onCategoryClick(this.props.index, this.props.category);
	};
	render() {
		const { category, onSubcategoryClick } = this.props;
		const subcategories = category.active
			? category.subcategories.map((subcategory, index) => (
					<Subcategory
						key={subcategory}
						index={index}
						subcategory={subcategory}
						onSubcategoryClick={onSubcategoryClick}
					/>
				))
			: null;
		return (
			<li className={this.props.className}>
				<a
					className={`category ${category.active ? 'active' : ''}`}
					onClick={this.onClick}
				>
					{category.name}
				</a>
				<ul className="subcategories">{subcategories}</ul>
			</li>
		);
	}
}

Category.defaultProps = {
	className: ''
};

Category.propTypes = {
	className: PropTypes.string,
	category: shapes.categoryShape.isRequired,
	index: PropTypes.number.isRequired,
	onCategoryClick: PropTypes.func.isRequired,
	onSubcategoryClick: PropTypes.func.isRequired
};

export default styled(Category)`
	margin-bottom: 0.5rem;
	list-style-type: none;
	
	.subcategories {
		padding-left: 1rem;
	}
`;
