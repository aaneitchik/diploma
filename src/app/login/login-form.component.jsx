import React from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import InputWithIcon from '../components/input-with-icon';

let LoginForm = props => {
	const { handleSubmit } = props;
	return (
		<div
			className={`uk-card uk-card-default uk-card-body ${props.className}`}
		>
			<form onSubmit={handleSubmit}>
				<div>
					<InputWithIcon name="email" type="email" icon="user" />
				</div>
				<div>
					<InputWithIcon
						name="password"
						type="password"
						icon="lock"
					/>
				</div>
				<button type="submit" className="uk-button uk-button-default">
					Войти
				</button>
			</form>
		</div>
	);
};

LoginForm.defaultProps = {
	className: ''
};

LoginForm.propTypes = {
	className: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired
};

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
