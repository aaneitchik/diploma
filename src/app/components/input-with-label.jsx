import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';

const InputWithLabel = props => (
	<div className={`${props.className}`}>
		<label className="uk-form-label" htmlFor={props.name}>
			{props.label}
		</label>
		<div className="uk-form-controls">
			<Field
				id={props.name}
				name={props.name}
				className="uk-input"
				component={props.component}
				type={props.type}
			/>
		</div>
	</div>
);

InputWithLabel.defaultProps = {
	className: ''
};

InputWithLabel.propTypes = {
	className: PropTypes.string,
	component: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default InputWithLabel;
