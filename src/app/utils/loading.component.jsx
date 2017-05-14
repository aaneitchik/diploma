import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Loading = props =>
	props.condition
		? <div className={props.className}>Загрузка...</div>
		: props.children;

Loading.defaultProps = {
	children: null,
	className: ''
};

Loading.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	condition: PropTypes.bool.isRequired
};

export default styled(Loading)`
	margin-top: 30vh;
	text-align: center;
`;
