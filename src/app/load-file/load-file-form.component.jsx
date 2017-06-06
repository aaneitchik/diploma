import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
import styled from 'styled-components';

import Button from '../components/button';
import Card from '../components/card';
import InputWithLabel from '../components/input-with-label';
import SelectDropdown from '../components/select-dropdown';
import TagInput from '../components/tag-input';

import { categoryShape } from '../utils/common-proptypes';

const FileInputLabel = Button.withComponent('label');

let LoadFileForm = props =>
	<Card>
		<form
			onSubmit={props.handleSubmit}
			className={`uk-grid-small ${props.className}`}
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
			<div>
				<ReactS3Uploader
					id="file"
					className="file-uploader"
					signingUrl="/api/files/s3/sign"
					onFinish={props.onUploadFinish}
				/>
				<FileInputLabel
					htmlFor="file"
					className="uk-button uk-button-default"
				>
					{props.file.name || 'Выберите файл'}
				</FileInputLabel>
			</div>
			<div className="buttons uk-width-1-1">
				<Button type="submit">Загрузить документ</Button>
			</div>
		</form>
	</Card>;

LoadFileForm.defaultProps = {
	className: ''
};

LoadFileForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	categories: PropTypes.arrayOf(categoryShape).isRequired,
	className: PropTypes.string,
	onCategoryChange: PropTypes.func.isRequired,
	onSubcategoryChange: PropTypes.func.isRequired,
	onUploadFinish: PropTypes.func.isRequired,
	selectedCategory: categoryShape.isRequired,
	selectedSubcategory: categoryShape.isRequired,
	file: PropTypes.shape({
		publicUrl: PropTypes.string,
		name: PropTypes.string
	}).isRequired
};

const validate = values => {
	const errors = {};
	if (!values.title) {
		errors.title = 'Название - обязательное поле!';
	}
	if (!values.author) {
		errors.author = 'Имя автора - обязательное поле!';
	}
	if (!values.shortDescription) {
		errors.shortDescription = 'Краткое описание - обязательное поле!';
	}
	return errors;
};

LoadFileForm = styled(LoadFileForm)`
	.file-uploader {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
	
	.file-uploader + label {
		margin: 0;
	}
`;

export default reduxForm({
	form: 'load-file',
	validate,
	initialValues: { tags: [] }
})(LoadFileForm);
