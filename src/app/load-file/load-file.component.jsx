import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoadFileForm from './load-file-form.component';

import * as actions from './load-file';
import { categoryShape } from '../utils/common-proptypes';

class LoadFile extends React.Component {
	constructor() {
		super();
		this.state = {
			file: {},
			selectedCategory: 'All',
			selectedSubcategory: 'All'
		};
	}
	componentWillUnmount() {
		this.props.quitLoadPage();
	}
	onCategoryChange = selectedCategory => {
		this.setState(prevState => ({ ...prevState, selectedCategory }));
	};
	onSubcategoryChange = selectedSubcategory => {
		this.setState(prevState => ({ ...prevState, selectedSubcategory }));
	};
	onUploadFinish = (awsInfo, file) => {
		this.setState(prevState => ({
			...prevState,
			file: {
				publicUrl: awsInfo.publicUrl,
				name: file.name
			}
		}));
	};
	submit = values => {
		this.props.loadFile({
			...values,
			category: values.category.name,
			subcategory: values.subcategory.name,
			file: this.state.file
		});
	};
	render() {
		return this.props.uploadSuccessful
			? <Redirect to="/" />
			: <div>
					<LoadFileForm
						onSubmit={this.submit}
						categories={this.props.categories}
						selectedCategory={this.state.selectedCategory}
						selectedSubcategory={this.state.selectedSubcategory}
						onCategoryChange={this.onCategoryChange}
						onSubcategoryChange={this.onSubcategoryChange}
						onUploadFinish={this.onUploadFinish}
						file={this.state.file}
					/>
				</div>;
	}
}

LoadFile.defaultProps = {
	uploadSuccessful: false
};

LoadFile.propTypes = {
	categories: PropTypes.arrayOf(categoryShape).isRequired,
	loadFile: PropTypes.func.isRequired,
	quitLoadPage: PropTypes.func.isRequired,
	uploadSuccessful: PropTypes.bool
};

function mapStateToProps(state) {
	return { categories: state.sidebar.categories, uploadSuccessful: state.loadFile.uploadSuccessful };
}

export default connect(mapStateToProps, actions)(LoadFile);
