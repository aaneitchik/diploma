import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';

const InputWithLabel = props =>
	<div className={`${props.className}`}>
		<label className="uk-form-label" htmlFor={props.name}>
			{props.label}
		</label>
		<div className="uk-form-controls">
			<Field
				id={props.name}
				{...props}
				component={renderField}
				className="uk-input"
			/>
		</div>
	</div>;

function renderField(componentProps) {
	const FieldComponent = componentProps.fieldComponent;
	const { touched, error } = componentProps.meta;

	// Leave only props required for a specific component type
	const notNeededProps = typeof FieldComponent === 'string'
		? ['input', 'meta', 'fieldComponent']
		: ['fieldComponent'];
	const neededProps = Object.assign({}, componentProps);
	notNeededProps.forEach(prop => {
		delete neededProps[prop];
	});

	return (
		<div>
			<FieldComponent {...componentProps.input} {...neededProps} />
			{touched && (error && <div>{error}</div>)}
		</div>
	);
}

InputWithLabel.defaultProps = {
	className: ''
};

InputWithLabel.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default InputWithLabel;
