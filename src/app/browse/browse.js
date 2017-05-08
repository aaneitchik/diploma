import axios from 'axios';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	files: [],
	pagination: {}
};

const ERROR = 'ERROR';
const LOAD_FILES_SUCCESS = 'LOAD_FILES_SUCCESS';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_FILES_SUCCESS: {
			const pagination = { ...action.payload };
			delete pagination.docs;
			return { ...state, files: action.payload.docs, pagination };
		}

		default:
			return state;
	}
}

export function getFilesByPage(paginationParams) {
	const defaultParams = {
		pageNumber: 1,
		pageSize: 10,
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
