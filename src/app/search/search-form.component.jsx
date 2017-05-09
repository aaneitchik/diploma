import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { categoryShape } from '../utils/common-proptypes';

import Button from '../components/button';
import InputWithLabel from '../components/input-with-label';
import SelectDropdown from '../components/select-dropdown';

let SearchForm = props => {
	const { handleSubmit } = props;
	return (
		<form
			onSubmit={handleSubmit}
			className={`uk-grid-small ${props.className}`}
			data-uk-grid
		>
			<InputWithLabel
				className="uk-width-1-2"
				component="input"
				label="Title"
				name="title"
				type="text"
			/>
			<InputWithLabel
				className="uk-width-1-2"
				component="input"
				label="Author"
				name="author"
				type="text"
			/>
			<InputWithLabel
				name="category"
				label="Category"
				className="uk-width-1-2 uk-margin"
				component={SelectDropdown}
				options={props.categories}
				labelKey="name"
				valueKey="name"
				onChange={props.onCategoryChange}
			/>
			{props.selectedCategory === 'All'
				? null
				: <InputWithLabel
						name="subcategory"
						label="Subcategory"
						className="uk-width-1-2 uk-margin"
						component={SelectDropdown}
						options={props.selectedCategory.subcategories}
						labelKey="name"
						valueKey="name"
					/>}
			<div className="buttons uk-width-1-1">
				<Button type="submit">Search</Button>
			</div>
		</form>
	);
};

SearchForm.defaultProps = {
	className: '',
	selectedCategory: 'All'
};

SearchForm.propTypes = {
	className: PropTypes.string,
	categories: PropTypes.arrayOf(categoryShape).isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onCategoryChange: PropTypes.func.isRequired,
	selectedCategory: PropTypes.oneOfType([categoryShape, PropTypes.string])
};

SearchForm = reduxForm({
	form: 'search'
})(SearchForm);

export default styled(SearchForm)`
	
`;
