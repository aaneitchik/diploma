import React from 'react';
import styled from 'styled-components';

import Link from '../../components/link';
import Button from '../../components/button';
import Icon from '../../components/icon';
import SidebarToggle from '../sidebar/sidebar-toggle';

class TopNavigation extends React.Component {
	render = () => {
		return (
			<div className={this.props.className}>
				<div className="col"><SidebarToggle target="#offcanvas" /></div>
				<div className="col">
					<Link to="/" className="logo">BSU Lib</Link>
				</div>
				<div className="col">
					<Link to="/search"><Icon type="search" /></Link>
					<Button>Load File</Button>
				</div>
			</div>
		);
	};
}

export default styled(TopNavigation)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 3rem;
	padding: 0.5rem;
	font-size: 1.2rem;
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
