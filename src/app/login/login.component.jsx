import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form.component';

import * as authActions from '../auth/auth';

class Login extends React.Component {
	submit = values => {
		this.props.login(values);
	};
	render() {
		const { authenticated, location } = this.props;
		return authenticated
			? <Redirect to={{ pathname: '/', state: { from: location } }} />
			: <LoginForm onSubmit={this.submit} />;
	}
}

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, authActions)(Login);
