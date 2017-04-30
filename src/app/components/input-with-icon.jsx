import React from 'react';
import { Field } from 'redux-form';

const InputWithIcon = props => {
	return (
		<div className="uk-inline">
			<span
				className="uk-form-icon"
				data-uk-icon={`icon: ${props.icon}`}
			/>
			<Field
				name={props.name}
				className="uk-input"
				component="input"
				type={props.type}
			/>
		</div>
	);
};

export default InputWithIcon;
