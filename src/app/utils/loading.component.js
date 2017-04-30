import React from 'react';
import styled from 'styled-components';

const Loading = (props) => {
	return props.condition
		? <div className={props.className}>Loading...</div>
		: props.children;
};

export default styled(Loading)`
	margin-top: 30vh;
	text-align: center;
`;
