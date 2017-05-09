import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';

import InputWithLabel from '../components/input-with-label';

let SearchForm = props => (
	<form className={`uk-grid-small ${props.className}`} data-uk-grid>
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
	</form>
);

SearchForm.defaultProps = {
	className: ''
};

SearchForm.propTypes = {
	className: PropTypes.string
};

SearchForm = reduxForm({
	form: 'search'
})(SearchForm);

export default styled(SearchForm)`
	
`;
