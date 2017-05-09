import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Card from '../components/card';
import SearchForm from './search-form.component';

import * as actions from './search';

class Search extends React.Component {
	render() {
		return (
			<Card className={this.props.className}>
				<SearchForm />
			</Card>
		);
	}
}

Search.defaultProps = {
	className: ''
};

Search.propTypes = {
	className: PropTypes.string
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, actions)(styled(Search)`

`);
