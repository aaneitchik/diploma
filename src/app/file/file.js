import axios from 'axios';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	current: {
		tags: []
	},
	downloadLink: '',
	videoFile: false
};

const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
const LOAD_FILE_ERROR = 'LOAD_FILE_ERROR';

const videoExtensions = ['mp4', 'avi', 'mkv'];

/* global window, document */

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_FILE_SUCCESS: {
			const file = action.payload;
			const videoFile =
				videoExtensions.indexOf(file.fileExtension) !== -1;
			const downloadLink = getDownloadLink(file);
			return { ...state, current: file, videoFile, downloadLink };
		}

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

export function downloadFile(filepath, filename) {
	return () => {
		const downloadLink = `${ROOT_URL}${filepath}`;
		const tempLink = document.createElement('a');
		tempLink.href = downloadLink;
		tempLink.setAttribute('download', filename);
		tempLink.setAttribute('target', '_blank');
		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);
	};
}

function getDownloadLink(file) {
	return `${window.location.origin}/uploads/${file.filename}`;
}
