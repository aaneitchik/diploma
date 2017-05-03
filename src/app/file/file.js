import axios from 'axios';

const ROOT_URL = '/api/files';

const INITIAL_STATE = { current: {} };

const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
const LOAD_FILE_ERROR = 'LOAD_FILE_ERROR';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_FILE_SUCCESS:
			return { ...state, current: action.payload };

		default:
			return state;
	}
}

export function getFileById(fileId) {
	return dispatch => {
		axios.get(`${ROOT_URL}/${fileId}`).then(
			response => {
				dispatch({ type: LOAD_FILE_SUCCESS, payload: response.data });
			},
			err => {
				dispatch({ type: LOAD_FILE_ERROR, payload: err });
			}
		);
	};
}
