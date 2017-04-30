import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginWithCookies } from './auth';
import Loading from '../utils/loading.component';

export default function(ComposedComponent) {
	class Authentication extends React.Component {
		componentDidMount() {
			if (!this.props.triedLogin) {
				this.props.loginWithCookies();
			}
		}
		render() {
			const { authenticated, location, triedLogin } = this.props;
			return (
				<Loading condition={!triedLogin}>
					{authenticated
						? <ComposedComponent {...this.props} />
						: <Redirect
								to={{
									pathname: 'login',
									state: { from: location }
								}}
							/>}
				</Loading>
			);
		}
	}

	function mapStateToProps(state) {
		return {
			authenticated: state.auth.authenticated,
			triedLogin: state.auth.triedLogin
		};
	}

	return connect(mapStateToProps, { loginWithCookies })(Authentication);
}
