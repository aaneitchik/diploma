import React from 'react';
import styled from 'styled-components';

const Sidebar = props => {
	return <div className={`uk-offcanvas-bar ${props.className}`}>Hello!</div>;
};

export default styled(Sidebar)`
	background-color: rgba(255, 255, 255, 0.9);
`;
