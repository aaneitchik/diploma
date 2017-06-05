import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoginForm from './login-form.component';

import { login, logout } from '../auth/auth';
import { locationShape } from '../utils/common-proptypes';

class Login extends React.Component {
	componentDidMount() {
		if (this.props.location.state.logout) {
			this.props.logout();
		}
	}
	submit = values => {
		this.props.login(values);
	};
	render() {
		const { authenticated, location, loggingOut } = this.props;
		return authenticated && !loggingOut
			? <Redirect to={{ pathname: '/', state: { from: location } }} />
			: <LoginForm onSubmit={this.submit} />;
	}
}

Login.defaultProps = {
	location: {
		pathname: ''
	}
};

Login.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	location: locationShape,
	loggingOut: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		loggingOut: state.auth.loggingOut
	};
}

export default connect(mapStateToProps, { login, logout })(Login);
