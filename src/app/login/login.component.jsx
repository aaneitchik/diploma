import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoginForm from './login-form.component';

import { login } from '../auth/auth';
import { locationShape } from '../utils/common-proptypes';

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

Login.defaultProps = {
	location: {
		pathname: ''
	}
};

Login.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	location: locationShape,
	login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { login })(Login);
