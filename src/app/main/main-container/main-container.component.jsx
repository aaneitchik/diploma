import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Browse from '../../browse/browse.component';
import Search from '../../search/search.component';

const routes = [
	{
		path: '/',
		exact: true,
		component: Browse
	},
	{
		path: '/search',
		component: Search
	}
];

const MainContainer = () => {
	return (
		<div>
			{routes.map((route, index) => {
				return (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.component}
					/>
				);
			})}
		</div>
	);
};

export default styled(MainContainer)`

`;
