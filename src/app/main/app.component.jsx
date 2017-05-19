import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import TopNavigation from './top-navigation/top-navigation.component';
import MainContainer from './main-container/main-container.component';
import Sidebar from './sidebar/sidebar.component';

import { logout } from '../auth/auth';
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
				user={this.props.user}
				location={this.props.location.pathname}
				logout={this.props.logout}
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

const styledApp = styled(App)`
	color: ${props => props.theme.primaryColor};
`;

function mapStateToProps(state) {
	return { user: state.auth.user };
}

export default connect(mapStateToProps, { logout })(styledApp);
