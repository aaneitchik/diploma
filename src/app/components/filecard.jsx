import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { fileShape } from '../utils/common-proptypes';

import FileIcon from './file-icon';
import TagList from './tag-list';

const Filecard = props => {
	const { file } = props;

	return (
		<Link
			to={`/file/${file._id}`}
			className={`uk-link-reset uk-card uk-card-default ${props.className}`}
		>
			<div className="file-icon">
				<FileIcon extension={file.fileExtension} />
			</div>
			<div className="card-body">
				<p className="title">{file.title}</p>
				<p className="author">{file.author}</p>
				<p className="short-description">{file.shortDescription}</p>
				<TagList tags={file.tags} />
				<p className="extension">.{file.fileExtension}</p>
			</div>
		</Link>
	);
};

Filecard.defaultProps = {
	className: ''
};

Filecard.propTypes = {
	className: PropTypes.string,
	file: fileShape.isRequired
};

export default styled(Filecard)`
	display: flex;
	margin-bottom: 1rem;
	padding: 0.5rem;
	word-break: break-word;
	
	&:last-child {
		margin-top: 0;
	}
	
	.file-icon {
		flex: none;
		padding-right: 0.5rem;
	}
	
	.card-body {
		flex: 1;
	}
	
	.title {
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.author {
		color: ${props => props.theme.secondaryTextColor};
		margin-bottom: 1rem;
	}
	
	.extension {
		font-weight: bold;
	}
	
	.uk-badge {
		background-color: ${props => props.theme.darkPrimaryColor};
	}
	
	p {
		margin: 0.25rem 0;
	}
	
	p:first-child {
		margin-top: 0;
	}
`;
