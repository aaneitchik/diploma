import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { DefaultPlayer as Video } from 'react-html5video';
import styled from 'styled-components';

import 'react-html5video/dist/styles.css';

import * as fileActions from './file';
import { fileShape } from '../utils/common-proptypes';

import Button from '../components/button';
import Card from '../components/card';
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
		const { file, videoFile, downloadLink } = this.props;
		const pdfBtn = (
			<Button target="_blank" href={`/api/files/open_pdf/${file._id}`}>
				Open PDF
			</Button>
		);
		return (
			<Card className={this.props.className}>
				<h4 className="title">{file.title}</h4>
				<h5 className="author">{file.author}</h5>
				{videoFile
					? <Video
							autoPlay
							controls={[
								'PlayPause',
								'Seek',
								'Time',
								'Volume',
								'Fullscreen'
							]}
						>
							<source
								src={downloadLink}
								type={`video/${file.fileExtension}`}
							/>
						</Video>
					: null}
				<p>{file.shortDescription}</p>
				<p>{file.description}</p>
				<TagList tags={file.tags} />
				<div className="buttons">
					<Button onClick={this.downloadFile}>Download File</Button>
					{file.fileExtension === 'pdf' ? pdfBtn : null}
				</div>
			</Card>
		);
	}
}

File.defaultProps = {
	className: ''
};

File.propTypes = {
	className: PropTypes.string,
	downloadFile: PropTypes.func.isRequired,
	downloadLink: PropTypes.string.isRequired,
	file: fileShape.isRequired,
	getFileById: PropTypes.func.isRequired,
	videoFile: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		file: state.file.current,
		videoFile: state.file.videoFile,
		downloadLink: state.file.downloadLink
	};
}

const styledFile = styled(File)`
	.title {
		margin-bottom: 0.5rem;
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.author {
		margin-top: 0;
		color: ${props => props.theme.secondaryTextColor};
	}
`;

export default connect(mapStateToProps, fileActions)(styledFile);
