import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Icon = props => (
	<span
		className={props.className}
		data-uk-icon={`icon: ${props.type}; ratio: 1.5`}
	/>
);

Icon.defaultProps = {
	className: ''
};

Icon.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string.isRequired
};

export default styled(Icon)`
	color: ${props => props.theme.textColor};
	transition: color 0.3s ease;
	
	&:hover {
		color: ${props => props.theme.primaryColor};
	}
`;
