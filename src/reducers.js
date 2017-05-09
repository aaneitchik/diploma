import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './app/auth/auth';
import BrowseReducer from './app/browse/browse';
import FileReducer from './app/file/file';
import SidebarReducer from './app/main/sidebar/sidebar';

const rootReducer = combineReducers({
	auth: AuthReducer,
	browse: BrowseReducer,
	file: FileReducer,
	form: formReducer,
	sidebar: SidebarReducer
});

export default rootReducer;
