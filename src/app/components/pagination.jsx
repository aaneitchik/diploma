import React from 'react';
import ReactPaginate from 'react-paginate';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import Icon from './icon';

const prevIcon = <Icon type="chevron-left" />;
const nextIcon = <Icon type="chevron-right" />;

const Pagination = props => (
	<ReactPaginate
		{...props}
		pageRangeDisplayed={5}
		marginPagesDisplayed={2}
		previousLabel={prevIcon}
		nextLabel={nextIcon}
		containerClassName={`uk-pagination uk-flex-center ${props.className}`}
		pageLinkClassName="page-link"
	/>
);

Pagination.defaultProps = {
	className: ''
};

Pagination.propTypes = {
	className: PropTypes.string
};

export default styled(Pagination)`
	background-color: rgba(255, 255, 255, 1);
	padding: 0.25rem 0;
	
	.selected {
		font-weight: bold;
	}
	
	.page-link:focus {
		outline: none !important;
	}
`;
