import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
	margin: 0 0.5rem;
	color: ${props => props.theme.textColor};
	transition: color 0.3s ease;
	text-decoration: none;
	text-transform: uppercase;
	
	&:hover {
		color: ${props => props.theme.primaryColor};
		text-decoration: none;
	}
`;
