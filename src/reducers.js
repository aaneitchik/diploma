import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './app/auth/auth';
import BrowseReducer from './app/browse/browse';

const rootReducer = combineReducers({
	auth: AuthReducer,
	browse: BrowseReducer,
	form: formReducer
});

export default rootReducer;
