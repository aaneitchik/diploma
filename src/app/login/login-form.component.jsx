import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

import InputWithIcon from '../components/input-with-icon';

class LoginForm extends React.Component {
	render() {
		const { handleSubmit } = this.props;
		return (
			<div
				className={`uk-card uk-card-default uk-card-body ${this.props.className}`}
			>
				<form onSubmit={handleSubmit}>
					<InputWithIcon name="email" type="email" icon="user" />
					<InputWithIcon
						name="password"
						type="password"
						icon="lock"
					/>
					<button
						type="submit"
						className="uk-button uk-button-default"
					>
						Log in
					</button>
				</form>
			</div>
		);
	}
}

LoginForm = reduxForm({
	form: 'login'
})(LoginForm);

export default styled(LoginForm)`
	width: 25%;
	margin: 10vh auto;
	padding-bottom: 10px;
	border: 6px solid ${props => props.theme.primaryColor};
	text-align: center;
	
	.uk-inline {
		margin-bottom: 0.5rem;
	}
	
	.uk-button {
		margin-top: 0.5rem;
	}
`;
