import React from 'react';
import Rater from 'react-rater';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import 'react-rater/lib/react-rater.css';

const Rating = props => (
	<span className={props.className}>
		<Rater {...props} /><span className="total">{props.rating}</span>
	</span>
);

Rating.defaultProps = {
	className: ''
};

Rating.propTypes = {
	className: PropTypes.string,
	rating: PropTypes.number.isRequired
};

export default styled(Rating)`
	display: inline;

	&:hover .total {
		display: inline;
	}

	.total {
		display: none;
		margin-left: 0.5rem;
		font-size: 1.5rem;
		font-weight: bold;
		line-height: 1;
	}

	a {
		text-decoration: none;
		color: #ccc !important;
		font-size: 1.5rem;
	}
	
	a:hover {
		color: #ccc !important;
	}
	
	a.is-active {
		color: gold !important;
	}
	
	a.will-be-active {
		color: red !important;
	}
`;
