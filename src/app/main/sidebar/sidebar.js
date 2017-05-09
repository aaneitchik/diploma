import axios from 'axios';

import { getFilesByPage } from '../../browse/browse';

const ROOT_URL = '/api/files';

const INITIAL_STATE = {
	categories: [],
	subcategories: [],
	selectedCategory: 'All',
	selectedSubcategory: 'All'
};

const LOAD_CATEGORIES = 'sidebar/LOAD_CATEGORIES';
export const TOGGLE_CATEGORY = 'sidebar/TOGGLE_CATEGORY';
export const TOGGLE_SUBCATEGORY = 'sidebar/TOGGLE_SUBCATEGORY';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_CATEGORIES:
			return { ...state, categories: action.payload };

		case TOGGLE_CATEGORY: {
			const { categoryIndex, selectedCategory } = action.payload;
			if (selectedCategory === 'All') {
				const categories = state.categories.map(category => ({
					...category,
					active: false
				}));
				return { ...state, categories, selectedCategory: 'All' };
			}
			const categories = state.categories.map(
				(category, index) =>
					index === categoryIndex
						? { ...category, active: true }
						: { ...category, active: false }
			);
			return {
				...state,
				categories,
				selectedCategory: { ...selectedCategory },
				selectedSubcategory: 'All'
			};
		}

		case TOGGLE_SUBCATEGORY: {
			return { ...state, selectedSubcategory: action.payload };
		}

		default:
			return state;
	}
}

export function getCategories() {
	return dispatch => {
		axios.get(`${ROOT_URL}/categories`).then(response => {
			response.data.forEach(category => {
				// eslint-disable-next-line no-param-reassign
				category.subcategories = category.subcategories.map(
					subcategory => ({
						name: subcategory
					})
				);
			});
			dispatch({ type: LOAD_CATEGORIES, payload: response.data });
		});
	};
}

export function toggleCategory(categoryIndex, selectedCategory, pagination) {
	return dispatch => {
		dispatch({
			type: TOGGLE_CATEGORY,
			payload: { categoryIndex, selectedCategory }
		});
		const paginationParams = Object.assign(
			{ ...pagination },
			{
				category: selectedCategory.name
			}
		);
		return dispatch(getFilesByPage(paginationParams));
	};
}

export function selectAll(pagination) {
	return dispatch => {
		dispatch({ type: TOGGLE_CATEGORY, payload: 'All' });
		const paginationParams = Object.assign(
			{ ...pagination },
			{
				category: 'All',
				subcategory: 'All'
			}
		);
		return dispatch(getFilesByPage(paginationParams));
	};
}

export function selectSubcategory(subcategory, pagination) {
	return dispatch => {
		dispatch({ type: TOGGLE_SUBCATEGORY, payload: subcategory });
		const paginationParams = Object.assign(
			{ ...pagination },
			{ subcategory }
		);
		return dispatch(getFilesByPage(paginationParams));
	};
}
