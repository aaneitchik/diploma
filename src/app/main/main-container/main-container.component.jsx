import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Browse from '../../browse/browse.component';
import File from '../../file/file.component';
import LoadFile from '../../load-file/load-file.component';
import Search from '../../search/search.component';

const routes = [
	{
		path: '/',
		exact: true,
		component: Browse
	},
	{
		path: '/file/load',
		component: LoadFile,
		exact: true
	},
	{
		path: '/file/:id',
		component: File
	},
	{
		path: '/search',
		component: Search
	}
];

const MainContainer = props => (
	<div className={props.className}>
		<Switch>
		{routes.map(route => (
			<Route
				key={route.path}
				path={route.path}
				exact={route.exact}
				component={route.component}
			/>
		))}
		</Switch>
	</div>
);

MainContainer.defaultProps = {
	className: ''
};

MainContainer.propTypes = {
	className: PropTypes.string
};

export default styled(MainContainer)`
	padding: 0.5rem;
`;
