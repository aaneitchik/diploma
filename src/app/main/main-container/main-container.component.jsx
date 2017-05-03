import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Browse from '../../browse/browse.component';
import File from '../../file/file.component';
import Search from '../../search/search.component';

const routes = [
	{
		path: '/',
		exact: true,
		component: Browse
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

const MainContainer = (props) => {
	return (
		<div className={props.className}>
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
	padding: 0.5rem;
`;
