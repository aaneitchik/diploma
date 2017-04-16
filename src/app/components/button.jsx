import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
	return <button className={`uk-button uk-button-default ${props.className}`}>{props.children}</button>
};

export default styled(Button)`
	margin: 0 0.5rem;
	color: ${props => props.theme.textColor};
	border: 2px solid ${props => props.theme.textColor} !important;
	border-radius: none;
	font-family: Novecento-Medium;
	transition: border-color 0.3s ease, color 0.3s ease !important;
	
	&:hover {
		color: ${props => props.theme.primaryColor};
		border-color: ${props => props.theme.primaryColor} !important;
	}
	
	&:first-child {
		margin-left: 0;
	}
	
	&:last-child {
		margin-right: 0;
	}
`;
