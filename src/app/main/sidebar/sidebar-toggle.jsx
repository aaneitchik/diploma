import React from 'react';
import styled from 'styled-components';

import Icon from '../../components/icon';

const SidebarToggle = props => {
	return (
		<button
			type="button"
			className={`uk-button uk-button-default ${props.className}`}
			data-uk-toggle={`target: ${props.target}`}
		>
			<Icon type="menu" />
		</button>
	);
};

export default styled(SidebarToggle)`
	border: none;
	padding: 0;
`;
