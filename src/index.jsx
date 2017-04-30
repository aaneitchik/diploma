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

import NovecentoNormal from './assets/fonts/Novecentosanswide-Normal.otf';
import NovecentoMedium from './assets/fonts/Novecentosanswide-Medium.otf';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

/* global document */

const appTheme = {
	primaryColor: '#fee469',
	textColor: '#161b24',
	hoverTextColor: '#5c6066',
	borderColor: '#e5e6e7'
};

injectGlobal`
	@font-face {
		font-family: Novecento-Medium;
		src: url('${NovecentoMedium}') format('opentype');
	}
	
	@font-face {
		font-family: Novecento-Normal;
		src: url('${NovecentoNormal}') format('opentype');
	}
	
	body {
		font-family: Novecento-Normal, sans serif;
	}
	
	.loader {
		
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
