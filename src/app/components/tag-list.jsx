import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const TagList = props => {
	const tags = props.tags.map(tag => (
		<Link to={`/search/${tag}`} key={tag} className="tag">#{tag}</Link>
	));

	return <div className={props.className}>{tags}</div>;
};

TagList.defaultProps = {
	className: ''
};

TagList.propTypes = {
	className: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default styled(TagList)`
	margin-top: 1rem;

	.tag {
		margin-right: 0.5rem;
		color: ${props => props.theme.darkPrimaryColor} !important;
		text-transform: uppercase;
		font-family: SourceSansPro-Regular, sans serif;
	}
`;
