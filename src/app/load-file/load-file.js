import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const ROOT_URL = '/api/files';

const TOGGLE_FILE_UPLOAD = 'load-file/TOGGLE_FILE_UPLOAD';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case TOGGLE_FILE_UPLOAD:
			return { ...state, uploadSuccessful: action.payload };
		default:
			return state;
	}
}

export function loadFile(file) {
	return dispatch => {
		axios.post(`${ROOT_URL}/upload`, file).then(
			() => {
				dispatch({ type: TOGGLE_FILE_UPLOAD, payload: true });
				toastr.light('', 'Файл успешно загружен!', { icon: 'success' });
			},
			err =>
				toastr.error(
					'',
					`Во время загрузки фала произошла ошибка: ${err}`
				)
		);
	};
}

export function quitLoadPage() {
	return dispatch => {
		dispatch({ type: TOGGLE_FILE_UPLOAD, payload: false });
	};
}
