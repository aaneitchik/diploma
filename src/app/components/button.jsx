import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Button = props => {
	const Tag = props.href ? 'a' : 'button';
	return (
		<Tag
			{...props}
			className={`uk-button uk-button-default ${props.className}`}
		>
			{props.children}
		</Tag>
	);
};

Button.defaultProps = {
	className: '',
	href: ''
};

Button.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default styled(Button)`
	margin: 0 0.5rem;
	color: ${props => props.theme.textColor};
	border: 1px solid ${props => props.theme.textColor} !important;
	border-radius: none;
	font-family: SourceSansPro-Regular;
	transition: border-color 0.5s ease, color 0.3s ease !important;
	
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
