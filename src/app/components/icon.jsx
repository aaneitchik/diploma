import React from 'react';
import styled from 'styled-components';

const Icon = (props) => {
	return <span className={props.className} data-uk-icon={`icon: ${props.type}; ratio: 1.5`} />
};

export default styled(Icon)`
	color: ${props => props.theme.textColor};
	transition: color 0.3s ease;
	
	&:hover {
		color: ${props => props.theme.primaryColor};
	}
`;