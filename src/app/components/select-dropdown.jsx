import React from 'react';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';

import { inputShape } from '../utils/common-proptypes';

const SelectDropdown = props =>
	<Select
		name={props.input.name}
		options={props.options}
		value={props.input.value}
		onChange={props.input.onChange}
		{...props}
	/>;

SelectDropdown.defaultProps = {
	labelKey: 'label',
	valueKey: 'value'
};

SelectDropdown.propTypes = {
	input: inputShape.isRequired,
	options: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default styled(SelectDropdown)`
	height: auto !important;
	line-height: 1 !important;
	padding:  0;
	border: 0;
`;
