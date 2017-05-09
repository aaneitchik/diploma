import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Card from '../components/card';
import SearchForm from './search-form.component';

import * as actions from './search';
import * as shapes from '../utils/common-proptypes';

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedCategory: 'All'
		};
	}
	onCategoryChange = selectedCategory => {
		this.setState(prevState => ({ ...prevState, selectedCategory }));
	};
	submit = values => {
		console.log(values);
	};
	render() {
		return (
			<Card className={this.props.className}>
				<SearchForm
					onSubmit={this.submit}
					selectedCategory={this.state.selectedCategory}
					onCategoryChange={this.onCategoryChange}
					categories={this.props.categories}
				/>
			</Card>
		);
	}
}

Search.defaultProps = {
	className: ''
};

Search.propTypes = {
	className: PropTypes.string,
	categories: PropTypes.arrayOf(shapes.categoryShape).isRequired
};

function mapStateToProps(state) {
	return { categories: state.sidebar.categories };
}

export default connect(mapStateToProps, actions)(styled(Search)`

`);
