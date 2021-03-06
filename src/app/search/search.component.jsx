import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Card from '../components/card';
import CardContainer from '../components/card-container';
import SearchForm from './search-form.component';

import * as actions from './search';
import * as shapes from '../utils/common-proptypes';

class Search extends React.Component {
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
		this.props.findFiles(values);
	};
	render() {
		const initialValues = {
			tags: this.props.match.params.term
				? [this.props.match.params.term]
				: []
		};
		return (
			<div>
				<Card className={this.props.className}>
					<SearchForm
						initialValues={initialValues}
						onSubmit={this.submit}
						selectedCategory={this.state.selectedCategory}
						selectedSubcategory={this.state.selectedSubcategory}
						onCategoryChange={this.onCategoryChange}
						onSubcategoryChange={this.onSubcategoryChange}
						categories={this.props.categories}
					/>
				</Card>
				<CardContainer files={this.props.searchResults} />
			</div>
		);
	}
}

Search.defaultProps = {
	className: '',
	searchResults: []
};

Search.propTypes = {
	className: PropTypes.string,
	categories: PropTypes.arrayOf(shapes.categoryShape).isRequired,
	findFiles: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: {
			term: PropTypes.string
		}
	}).isRequired,
	searchResults: PropTypes.arrayOf(shapes.fileShape)
};

function mapStateToProps(state) {
	return {
		categories: state.sidebar.categories,
		searchResults: state.search.searchResults
	};
}

export default connect(mapStateToProps, actions)(
	styled(Search)`

`
);
