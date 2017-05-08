import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import * as fileActions from './file';

import Button from '../components/button';
import TagList from '../components/tag-list';

class File extends React.Component {
	componentDidMount() {
		const fileId = this.props.match.params.id;
		this.props.getFileById(fileId);
	}

	downloadFile = () => {
		const fileId = this.props.file._id;
		const filename = this.props.file.filename;
		this.props.downloadFile(fileId, filename);
	};

	render() {
		const { file } = this.props;
		const pdfBtn = (
			<Button target="_blank" href={`/api/files/open_pdf/${file._id}`}>
				Open PDF
			</Button>
		);
		return (
			<div className={`uk-card uk-card-default ${this.props.className}`}>
				<h4 className="title">{file.title}</h4>
				<h5 className="author">{file.author}</h5>
				<p>{file.shortDescription}</p>
				<p>{file.description}</p>
				<TagList tags={file.tags} />
				<div className="download-btn">
					<Button onClick={this.downloadFile}>Download File</Button>
					{file.fileExtension === 'pdf' ? pdfBtn : null}
				</div>
			</div>
		);
	}
}

File.defaultProps = {
	className: ''
};

File.propTypes = {
	className: PropTypes.string,
	getFileById: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return { file: state.file.current };
}

const styledFile = styled(File)`
	padding: 1.5rem;
	
	.title {
		margin-bottom: 0.5rem;
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.author {
		margin-top: 0;
		color: ${props => props.theme.secondaryTextColor};
	}
	
	.download-btn {
		margin-top: 1rem;
		text-align: center;
	}
`;

export default connect(mapStateToProps, fileActions)(styledFile);
