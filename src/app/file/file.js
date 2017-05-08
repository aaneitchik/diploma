import axios from 'axios';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	current: {
		tags: []
	}
};

const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
const LOAD_FILE_ERROR = 'LOAD_FILE_ERROR';

/* global window, document */

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

export function downloadFile(fileId, filename) {
	return () => {
		const downloadLink = `${window.location.origin}${ROOT_URL}/download/${fileId}`;
		const tempLink = document.createElement('a');
		tempLink.href = downloadLink;
		tempLink.setAttribute('download', filename);
		tempLink.setAttribute('target', '_blank');
		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);
	};
}
