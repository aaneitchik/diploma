import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Card = props => (
	<div {...props} className={`uk-card uk-card-default ${props.className}`}>
		{props.children}
	</div>
);

Card.defaultProps = {
	className: ''
};

Card.propTypes = {
	className: PropTypes.string
};

export default styled(Card)`
	padding: 1.5rem;
`;
