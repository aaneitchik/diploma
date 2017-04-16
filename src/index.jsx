import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';

import App from './app/main/app.component';

import NovecentoNormal from './assets/fonts/Novecentosanswide-Normal.otf';
import NovecentoMedium from './assets/fonts/Novecentosanswide-Medium.otf';

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
`;

ReactDOM.render(
	<ThemeProvider theme={appTheme}><App /></ThemeProvider>,
	document.getElementById('app-container')
);
