import React from 'react';
import styled from 'styled-components';

import TopNavigation from './top-navigation/top-navigation.component';
import MainContainer from './main-container/main-container.component';
import Sidebar from './sidebar/sidebar.component';

class App extends React.Component {
	state = {
		drawerActive: false
	};
	toggleDrawer = () => {
		this.setState({ drawerActive: !this.state.drawerActive });
	};
	render = () => {
		return (
			<div
				data-uk-height-viewport
				className={`uk-offcanvas-content ${this.props.className}`}
			>
				<TopNavigation toggleDrawer={this.toggleDrawer} />
				<MainContainer data-uk-height-viewport="offset-top: true" />
				<div id="offcanvas" data-uk-offcanvas="overlay: true">
					<Sidebar className={this.props.className} />
				</div>
			</div>
		);
	};
}

export default styled(App)`
	color: ${props => props.theme.primaryColor};
`;
