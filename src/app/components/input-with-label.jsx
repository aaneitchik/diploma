import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';

const InputWithLabel = props =>
	<div className={`${props.className}`}>
		<label className="uk-form-label" htmlFor={props.name}>
			{props.label}
		</label>
		<div className="uk-form-controls">
			<Field id={props.name} {...props} className="uk-input" />
		</div>
	</div>;

InputWithLabel.defaultProps = {
	className: ''
};

InputWithLabel.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default InputWithLabel;
