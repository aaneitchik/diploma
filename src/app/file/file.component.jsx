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
import Rating from '../components/rating';
import TagList from '../components/tag-list';

/* global DISQUS, window */
class File extends React.Component {
	componentDidMount() {
		const fileId = this.props.match.params.id;
		this.props.getFileById(fileId);
		console.log(DISQUS);
		DISQUS.reset({
			reload: true,
			config() {
				console.log(this);
				this.page.identifier = fileId;
				this.page.url = window.location.href;
			}
		});
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
				Просмотр PDF
			</Button>
		);
		return (
			<div>
				<Card className={this.props.className}>
					<h4 className="title">{file.title}</h4>
					<h5 className="author">{file.author}</h5>
					{file.ratingSum === undefined
						? null
						: <Rating
								rating={file.ratingSum}
								interactive={file.canBeRated}
							/>}
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
						<Button onClick={this.downloadFile}>
							Скачать файл
						</Button>
						{file.fileExtension === 'pdf' ? pdfBtn : null}
					</div>
				</Card>
				<Card>
					<div id="disqus_thread" />
				</Card>
			</div>
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
	margin-bottom: 0.5rem;

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
