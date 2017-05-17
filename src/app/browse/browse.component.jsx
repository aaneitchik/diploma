import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as browseActions from './browse';
import * as shapes from '../utils/common-proptypes';

import CardContainer from '../components/card-container';
import Pagination from '../components/pagination';

class Browse extends React.Component {
	componentDidMount() {
		this.props.getFilesByPage(this.props.pagination);
	}
	getPage = page => {
		const paginationParams = Object.assign(...this.props.pagination, {
			pageNumber: page.selected + 1
		});
		this.props.getFilesByPage(paginationParams);
	};
	render() {
		const { files, pagination } = this.props;
		return (
			<div>
				<CardContainer files={files} />
				{pagination.total
					? <Pagination
							pageCount={pagination.pages}
							onPageChange={this.getPage}
						/>
					: null}
			</div>
		);
	}
}

Browse.defaultProps = {
	files: []
};

Browse.propTypes = {
	files: PropTypes.arrayOf(shapes.fileShape),
	getFilesByPage: PropTypes.func.isRequired,
	pagination: shapes.paginationShape.isRequired
};

function mapStateToProps(state) {
	return {
		files: state.browse.files,
		pagination: state.browse.pagination
	};
}

export default connect(mapStateToProps, browseActions)(Browse);
