import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './app/auth/auth';

const rootReducer = combineReducers({
	auth: AuthReducer,
	form: formReducer
});

export default rootReducer;
