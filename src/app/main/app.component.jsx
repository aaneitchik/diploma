import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import TopNavigation from './top-navigation/top-navigation.component';
import MainContainer from './main-container/main-container.component';
import Sidebar from './sidebar/sidebar.component';

import { locationShape } from '../utils/common-proptypes';

class App extends React.Component {
	state = {
		drawerActive: false
	};
	toggleDrawer = () => {
		this.setState({ drawerActive: !this.state.drawerActive });
	};
	render = () => (
		<div
			data-uk-height-viewport
			className={`uk-offcanvas-content ${this.props.className}`}
		>
			<TopNavigation
				location={this.props.location.pathname}
				toggleDrawer={this.toggleDrawer}
			/>
			<MainContainer data-uk-height-viewport="offset-top: true" />
			<div id="offcanvas" data-uk-offcanvas="overlay: true">
				<Sidebar className={this.props.className} />
			</div>
		</div>
	);
}

App.defaultProps = {
	className: ''
};

App.propTypes = {
	className: PropTypes.string,
	location: locationShape.isRequired
};

export default styled(App)`
	color: ${props => props.theme.primaryColor};
`;
