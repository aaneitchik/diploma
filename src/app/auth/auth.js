import axios from 'axios';
import { union, flattenDeep } from 'lodash';

const ROOT_URL = '/api/';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const INITIAL_STATE = {
	authenticated: false,
	user: { availableCategories: [] },
	triedLogin: false
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const user = action.payload.data;
			user.availableCategories = getAvailableCategories(user);
			return {
				...state,
				user,
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
