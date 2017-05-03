import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import Icon from './icon';

const prevIcon = <Icon type="chevron-left" />;
const nextIcon = <Icon type="chevron-right" />;

const Pagination = props => {
	return (
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
