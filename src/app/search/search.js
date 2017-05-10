import axios from 'axios';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	searchResults: []
};

const FOUND_FILES = 'seaarch/FOUND_FILES';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FOUND_FILES:
			return { ...state, searchResults: action.payload };

		default:
			return state;
	}
}

export function findFiles(query) {
	const params = { ...query };
	params.category = query.category && query.category.name
		? query.category.name
		: undefined;
	params.subcategory = query.subcategory && query.subcategory.name
		? query.subcategory.name
		: undefined;
	return dispatch => {
		axios.post(`${ROOT_URL}/find`, params).then(response => {
			dispatch({ type: FOUND_FILES, payload: response.data });
		});
	};
}
