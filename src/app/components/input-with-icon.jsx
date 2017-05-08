import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';

const InputWithIcon = props => (
	<div className="uk-inline">
		<span className="uk-form-icon" data-uk-icon={`icon: ${props.icon}`} />
		<Field
			name={props.name}
			className="uk-input"
			component="input"
			type={props.type}
		/>
	</div>
);

InputWithIcon.propTypes = {
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default InputWithIcon;
