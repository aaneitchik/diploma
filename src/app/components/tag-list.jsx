import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const TagList = props => {
	const tags = props.tags.map(tag => (
		<span key={tag} className="tag">#{tag}</span>
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
		color: ${props => props.theme.darkPrimaryColor};
		text-transform: uppercase;
		font-family: SourceSansPro-Regular, sans serif;
	}
`;
