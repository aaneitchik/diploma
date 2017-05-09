import axios from 'axios';

import { TOGGLE_CATEGORY, TOGGLE_SUBCATEGORY } from '../main/sidebar/sidebar';
import { LOGIN_SUCCESS } from '../auth/auth';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	files: [],
	pagination: {
		pageSize: 10,
		category: 'All',
		subcategory: 'All',
		availableCategories: []
	}
};

const ERROR = 'browse/ERROR';
const LOAD_FILES_SUCCESS = 'browse/LOAD_FILES_SUCCESS';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_FILES_SUCCESS: {
			const pagination = Object.assign(
				{ ...state.pagination },
				action.payload
			);
			delete pagination.docs;
			return { ...state, files: action.payload.docs, pagination };
		}

		case LOGIN_SUCCESS: {
			const availableCategories = [
				...action.payload.data.availableCategories
			];
			return {
				...state,
				pagination: { ...state.pagination, availableCategories }
			};
		}

		case TOGGLE_CATEGORY: {
			const pagination = { ...state.pagination };
			const selectedCategory = { ...action.payload.selectedCategory };
			if (selectedCategory === 'All') {
				return {
					...state,
					pagination: {
						...pagination,
						category: 'All',
						subcategory: 'All'
					}
				};
			}
			return {
				...state,
				pagination: {
					...pagination,
					category: selectedCategory.name,
					subcategory: 'All'
				}
			};
		}

		case TOGGLE_SUBCATEGORY: {
			const pagination = { ...state.pagination };
			return {
				...state,
				pagination,
				subcategory: action.payload
			};
		}

		default:
			return state;
	}
}

export function getFilesByPage(paginationParams) {
	const defaultParams = {
		pageNumber: 1,
		category: 'All',
		subcategory: 'All'
	};
	const params = Object.assign(defaultParams, paginationParams);
	return dispatch => {
		axios.post(ROOT_URL, params).then(
			response => {
				dispatch({ type: LOAD_FILES_SUCCESS, payload: response.data });
			},
			err => {
				dispatch({ type: ERROR, payload: err });
			}
		);
	};
}
