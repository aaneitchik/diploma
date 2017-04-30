import axios from 'axios';

const ROOT_URL = '/api/';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const INITIAL_STATE = { authenticated: false, user: {}, triedLogin: false };

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload.data,
				authenticated: true,
				triedLogin: true
			};

		case LOGIN_ERROR:
			return { ...state, triedLogin: true };

		default:
			return state;
	}
}

export function login(creds) {
	return dispatch => {
		axios
			.post(`${ROOT_URL}login`, creds)
			.then(response => {
				dispatch({ type: LOGIN_SUCCESS, payload: response });
			})
			.catch(err => {
				dispatch({ type: LOGIN_ERROR, payload: err });
			});
	};
}

export function loginWithCookies() {
	return dispatch => {
		axios
			.post(`${ROOT_URL}login_with_cookies`)
			.then(response => {
				dispatch({ type: LOGIN_SUCCESS, payload: response });
			})
			.catch(err => {
				dispatch({ type: LOGIN_ERROR, payload: err });
			});
	};
}
