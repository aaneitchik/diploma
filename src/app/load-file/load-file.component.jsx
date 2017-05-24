import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import LoadFileForm from './load-file-form.component';

import * as actions from './load-file';
import { categoryShape } from '../utils/common-proptypes';

class LoadFile extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedCategory: 'All',
			selectedSubcategory: 'All'
		};
	}
	onCategoryChange = selectedCategory => {
		this.setState(prevState => ({ ...prevState, selectedCategory }));
	};
	onSubcategoryChange = selectedSubcategory => {
		this.setState(prevState => ({ ...prevState, selectedSubcategory }));
	};
	submit = values => {
		console.log(values);
	};
	render() {
		return (
			<div>
				<LoadFileForm
					onSubmit={this.submit}
					categories={this.props.categories}
					selectedCategory={this.state.selectedCategory}
					selectedSubcategory={this.state.selectedSubcategory}
					onCategoryChange={this.onCategoryChange}
					onSubcategoryChange={this.onSubcategoryChange}
				/>
			</div>
		);
	}
}

LoadFile.propTypes = {
	categories: PropTypes.arrayOf(categoryShape).isRequired
};

function mapStateToProps(state) {
	return { categories: state.sidebar.categories };
}

export default connect(mapStateToProps, actions)(LoadFile);
