import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FileIcon from './file-icon';

const Filecard = props => {
	const { file } = props;
	const tags = file.tags.map(tag => (
		<span key={tag} className="tag">#{tag}</span>
	));

	return (
		<Link to={`/file/${file._id}`} className={`uk-link-reset uk-card uk-card-default ${props.className}`}>
			<div className="file-icon">
				<FileIcon extension={file.fileExtension} />
			</div>
			<div className="card-body">
				<p className="title">{file.title}</p>
				<p className="author">{file.author}</p>
				<p className="short-description">{file.shortDescription}</p>
				<p className="tags">{tags}</p>
				<p className="extension">.{file.fileExtension}</p>
			</div>
		</Link>
	);
};

export default styled(Filecard)`
	display: flex;
	margin-bottom: 1rem;
	padding: 0.5rem;
	font-size: 0.7rem;
	text-transform: uppercase;
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
		font-size: 1rem;
	}
	
	.author {
		color: ${props => props.theme.secondaryTextColor};	
	}
	
	.tags {
		margin-top: 1rem;
	}
	
	.tag {
		color: ${props => props.theme.darkPrimaryColor};
		margin-right: 0.25rem;
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
