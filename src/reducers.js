import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import AuthReducer from './app/auth/auth';
import BrowseReducer from './app/browse/browse';
import FileReducer from './app/file/file';
import LoadFileReducer from './app/load-file/load-file';
import SearchReducer from './app/search/search';
import SidebarReducer from './app/main/sidebar/sidebar';

const rootReducer = combineReducers({
	auth: AuthReducer,
	browse: BrowseReducer,
	file: FileReducer,
	form: formReducer,
	loadFile: LoadFileReducer,
	search: SearchReducer,
	sidebar: SidebarReducer,
	toastr: toastrReducer
});

export default rootReducer;
