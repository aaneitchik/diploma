import React from 'react';
import styled from 'styled-components';

import TopNavigation from './top-navigation/top-navigation.component';
import MainContainer from './main-container/main-container.component';

class App extends React.Component {
	state = {
		drawerActive: false
	};
	toggleDrawer = () => {
		this.setState({ drawerActive: !this.state.drawerActive });
	};
	render = () => {
		return (
			<div data-uk-height-viewport className={this.props.className}>
				<TopNavigation toggleDrawer={this.toggleDrawer} />
				<MainContainer/>
			</div>
		);
	};
}

export default styled(App)`
	color: ${props => props.theme.primaryColor};
`;
