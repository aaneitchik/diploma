import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { categoryShape } from '../utils/common-proptypes';

import Button from '../components/button';
import InputWithLabel from '../components/input-with-label';
import SelectDropdown from '../components/select-dropdown';
import TagInput from '../components/tag-input';

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
				label="Название"
				name="title"
				type="text"
			/>
			<InputWithLabel
				className="uk-width-1-2"
				component="input"
				label="Автор"
				name="author"
				type="text"
			/>
			<InputWithLabel
				name="category"
				label="Категория"
				className="uk-width-1-2"
				component={SelectDropdown}
				options={props.categories}
				labelKey="name"
				valueKey="name"
				onChange={props.onCategoryChange}
				placeholder="Выбраны все категории"
			/>
			{!props.selectedCategory.name
				? null
				: <InputWithLabel
						name="subcategory"
						label="Подкатегория"
						className="uk-width-1-2"
						component={SelectDropdown}
						options={props.selectedCategory.subcategories}
						labelKey="name"
						valueKey="name"
						onChange={props.onSubcategoryChange}
						placeholder="Выбраны все подкатегории"
					/>}
			{props.selectedSubcategory.name !== 'Статьи'
				? null
				: <InputWithLabel
						label="Место публикации"
						name="publicationPlace"
						className="uk-width-1-2"
						component="input"
						type="text"
					/>}
			{props.selectedSubcategory.name !== 'Статьи'
				? null
				: <InputWithLabel
						label="Год публикации"
						name="publicationYear"
						className="uk-width-1-4"
						component="input"
						type="number"
					/>}
			<InputWithLabel
				name="tags"
				label="Теги"
				className="uk-width-1-1"
				component={TagInput}
			/>
			<div className="buttons uk-width-1-1">
				<Button type="submit">Найти</Button>
			</div>
		</form>
	);
};

SearchForm.defaultProps = {
	className: '',
	selectedCategory: 'All',
	selectedSubcategory: 'All'
};

SearchForm.propTypes = {
	className: PropTypes.string,
	categories: PropTypes.arrayOf(categoryShape).isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onCategoryChange: PropTypes.func.isRequired,
	onSubcategoryChange: PropTypes.func.isRequired,
	selectedCategory: categoryShape,
	selectedSubcategory: categoryShape
};

SearchForm = reduxForm({
	form: 'search'
})(SearchForm);

export default styled(SearchForm)`
	
`;
