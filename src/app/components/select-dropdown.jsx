import React from 'react';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import Select from 'react-select';

const SelectDropdown = props => {
	const SelectComponent = (
		<Select name={props.name} options={props.options} />
	);
	return <Field name={props.name} component={SelectComponent} />;
};

SelectDropdown.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SelectDropdown;
