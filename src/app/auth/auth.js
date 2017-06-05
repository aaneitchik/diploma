import axios from 'axios';
import { union, flattenDeep } from 'lodash';

const ROOT_URL = '/api/';

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const TOGGLE_LOGGING_OUT = 'auth/TOGGLE_LOGGING_OUT';

const INITIAL_STATE = {
	authenticated: false,
	loggingOut: false,
	user: { availableCategories: [] },
	triedLogin: false
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_SUCCESS: {
			const user = action.payload.data;
			user.availableCategories = getAvailableCategories(user);
			return {
				...state,
				user,
				authenticated: true,
				triedLogin: true
			};
		}

		case LOGIN_ERROR: {
			return { ...state, triedLogin: true };
		}

		case LOGOUT_SUCCESS: {
			return {
				...state,
				authenticated: false,
				triedLogin: true,
				loggingOut: false
			};
		}

		case TOGGLE_LOGGING_OUT: {
			const authenticated = action.payload ? false : state.authenticated;
			return { ...state, loggingOut: action.payload, authenticated };
		}

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
				dispatch({ type: TOGGLE_LOGGING_OUT, payload: false });
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

export function logout() {
	return dispatch => {
		dispatch({ type: TOGGLE_LOGGING_OUT, payload: true });
		axios
			.post(`${ROOT_URL}logout`)
			.then(response =>
				dispatch({ type: LOGOUT_SUCCESS, payload: response })
			)
			.catch(() =>
				dispatch({ type: TOGGLE_LOGGING_OUT, payload: false })
			);
	};
}

function getAvailableCategories(user) {
	const currentSem = user.semester;
	const previousSem = user.semester - 1;
	const availableCategories = user.recordBook
		.filter(
			semester =>
				semester.number === currentSem ||
				semester.number === previousSem
		)
		.map(sem =>
			sem.disciplines
				.filter(discipline => !discipline.passed)
				.map(discipline => discipline.name)
		);
	availableCategories.push('Программное обеспечение', 'Электронные курсы');
	return union(flattenDeep(availableCategories));
}
