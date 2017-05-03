import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import App from './app/main/app.component';
import Login from './app/login/login.component';
import requireAuth from './app/auth/auth.component';

import SourceSansProRegular from './assets/fonts/SourceSansPro-Regular.otf';
import SourceSansProLight from './assets/fonts/SourceSansPro-Light.otf';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

/* global document */

const appTheme = {
	primaryColor: '#00a3ad',
	darkPrimaryColor: '#007178',
	textColor: '#3e4a64',
	secondaryTextColor: '#b2b9c0',
	hoverTextColor: '#5c6066',
	borderColor: '#e5e6e7',
	color: '#e6f2f0'
};

injectGlobal`
	@font-face {
		font-family: SourceSansPro-Light;
		src: url('${SourceSansProLight}') format('opentype');
	}
	
	@font-face {
		font-family: SourceSansPro-Regular;
		src: url('${SourceSansProRegular}') format('opentype');
	}
	
	body {
		font-family: SourceSansPro-Regular, sans serif;
		background-color: rgba(230, 242, 240, 0.4);
	}
`;

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={appTheme}>
				<div>
					<Route path="/login" component={Login} />
					<Route path="/" component={requireAuth(App)} />
				</div>
			</ThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('app-container')
);
