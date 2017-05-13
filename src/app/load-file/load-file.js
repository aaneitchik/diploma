import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const ROOT_URL = '/api/files';

export function loadFile(file) {
	return () => {
		axios.post(`${ROOT_URL}/upload`, file).then(
			() => {
				toastr.success('', 'File uploaded successfully!');
			},
			err =>
				toastr.error('', `An error occured while loading file: ${err}`)
		);
	};
}
