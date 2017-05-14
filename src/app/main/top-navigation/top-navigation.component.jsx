import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Link from '../../components/link';
import Button from '../../components/button';
import Icon from '../../components/icon';
import SidebarToggle from '../sidebar/sidebar-toggle';

const TopNavigation = props => (
	<div className={props.className}>
		<div className="col">
			{props.location === '/'
				? <SidebarToggle target="#offcanvas" />
				: null}
		</div>
		<div className="col">
			<Link to="/" className="logo">Библиотека БГУ</Link>
		</div>
		<div className="col">
			<Link to="/search"><Icon type="search" /></Link>
			<Link to="/file/load"><Button>Загрузить документ</Button></Link>
		</div>
	</div>
);

TopNavigation.defaultProps = {
	className: ''
};

TopNavigation.propTypes = {
	className: PropTypes.string,
	location: PropTypes.string.isRequired
};

export default styled(TopNavigation)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 3rem;
	padding: 0.5rem;
	font-size: 1.2rem;
	background-color: rgba(255, 255, 255, 0.7);
	border: 1px solid ${props => props.theme.borderColor};

	.col {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.col:first-child {
		justify-content: flex-start;
	}
	
	.col:last-child {
		justify-content: flex-end;
	}
`;
