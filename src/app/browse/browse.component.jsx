import React from 'react';
import { connect } from 'react-redux';

import * as browseActions from './browse';

import CardContainer from '../components/card-container';
import Pagination from '../components/pagination';

class Browse extends React.Component {
	componentDidMount() {
		const paginationParams = {
			availableCategories: this.props.availableCategories
		};
		this.props.getFilesByPage(paginationParams);
	}
	getPage = (page) => {
		const paginationParams = {
			pageNumber: page.selected + 1,
			availableCategories: this.props.availableCategories
		};
		this.props.getFilesByPage(paginationParams);
	};
	render() {
		const { files, pagination } = this.props;
		return (
			<div>
				<CardContainer files={files} />
				{pagination.total
					? <Pagination pageCount={pagination.pages} onPageChange={this.getPage} />
					: null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		files: state.browse.files,
		pagination: state.browse.pagination,
		availableCategories: state.auth.user.availableCategories
	};
}

export default connect(mapStateToProps, browseActions)(Browse);
