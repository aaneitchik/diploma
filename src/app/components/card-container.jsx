import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { fileShape } from '../utils/common-proptypes';

import Filecard from './filecard';

const CardContainer = props => {
	const cards = props.files.map(file => (
		<Filecard key={file._id} file={file} />
	));
	return (
		<div className={props.className}>
			{cards.length === 0 ? 'No files found' : cards}
		</div>
	);
};

CardContainer.defaultProps = {
	className: ''
};

CardContainer.propTypes = {
	className: PropTypes.string,
	files: PropTypes.arrayOf(fileShape).isRequired
};

export default styled(CardContainer)`
	display: flex;
	align-items: stretch;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 1rem 0;
	color: ${props => props.theme.textColor};
	
	.uk-card {
		width: 48%;
	}
`;
