import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';

import Button from '../components/button';
import Card from '../components/card';
import InputWithLabel from '../components/input-with-label';
import SelectDropdown from '../components/select-dropdown';
import TagInput from '../components/tag-input';

import { categoryShape } from '../utils/common-proptypes';

const LoadFileForm = props => (
	<Card>
		<form
			onSubmit={props.handleSubmit}
			className="uk-grid-small"
			data-uk-grid
		>
			<InputWithLabel
				label="Название"
				name="title"
				className="uk-width-1-1"
				component="input"
				type="text"
			/>
			<InputWithLabel
				label="Автор"
				name="author"
				className="uk-width-1-2"
				component="input"
				type="text"
			/>
			<InputWithLabel
				label="Краткое описание"
				name="shortDescription"
				className="uk-width-1-1"
				component="textarea"
				type="text"
			/>
			<InputWithLabel
				label="Полное описание"
				name="description"
				className="uk-width-1-1"
				component="textarea"
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
				placeholder="Выберите категорию"
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
						placeholder="Выберите подкатегорию"
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
						className="uk-width-1-8"
						component="input"
						type="number"
					/>}
			<InputWithLabel
				name="tags"
				label="Теги"
				className="uk-width-1-1"
				component={TagInput}
			/>
			<ReactS3Uploader
				signingUrl="/api/files/s3/sign"
				onFinish={props.onUploadFinish}
			/>
			<div className="buttons uk-width-1-1">
				<Button type="submit">Загрузить документ</Button>
			</div>
		</form>
	</Card>
);

LoadFileForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	categories: PropTypes.arrayOf(categoryShape).isRequired,
	onCategoryChange: PropTypes.func.isRequired,
	onSubcategoryChange: PropTypes.func.isRequired,
	onUploadFinish: PropTypes.func.isRequired,
	selectedCategory: categoryShape.isRequired,
	selectedSubcategory: categoryShape.isRequired
};

export default reduxForm({
	form: 'load-file',
	initialValues: { tags: [] }
})(LoadFileForm);
