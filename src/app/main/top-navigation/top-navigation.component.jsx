import React from 'react';
import styled from 'styled-components';

import Link from '../../components/link';
import Button from '../../components/button';
import Icon from '../../components/icon';

class TopNavigation extends React.Component {
	render = () => {
		return (
			<div className={this.props.className}>
				<Link onClick={this.props.toggleDrawer}>
					<Icon type="menu" />
				</Link>
				<Link>Browse</Link>
				<Link className="logo">BSU Lib</Link>
				<div />
				<Button>Load File</Button>
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

	& > {
		flex: 1;	
	}
`;
