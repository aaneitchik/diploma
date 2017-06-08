import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { ThemeProvider, injectGlobal } from 'styled-components';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'uikit/dist/css/uikit.min.css';
import 'react-select/dist/react-select.min.css';
import 'react-tagging-input/dist/styles.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import reducers from './reducers';

import App from './app/main/app.component';
import Login from './app/login/login.component';
import requireAuth from './app/auth/auth.component';

import SourceSansProRegular from './assets/fonts/SourceSansPro-Regular.otf';
import SourceSansProLight from './assets/fonts/SourceSansPro-Light.otf';

const composeEnhancers = composeWithDevTools({});
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(reduxThunk))
);

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
		font-size: 14px;
		font-family: SourceSansPro-Light, sans serif;
		background-color: rgba(230, 242, 240, 0.8);
	}
	
	.title {
		font-family: SourceSansPro-Regular, sans serif;
	}
	
	.buttons {
		margin-top: 1rem;
		text-align: center;
	}
`;

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={appTheme}>
				<div>
					<Route path="/login" component={Login} />
					<Route path="/" component={requireAuth(App)} />
					<ReduxToastr
						timeOut={4000}
						newestOnTop={false}
						preventDuplicates
						transitionIn="fadeIn"
						transitionOut="fadeOut"
					/>
				</div>
			</ThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('app-container')
);
