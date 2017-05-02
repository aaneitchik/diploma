import React from 'react';
import styled from 'styled-components';

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

export default styled(CardContainer)`
	display: flex;
	align-items: stretch;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 1rem 0;
`;
