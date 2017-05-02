import React from 'react';
import styled from 'styled-components';

import Icon from './icon';

const StyledIcon = styled(Icon)`
	color: white;
	background-color: ${props => getIconBackground(props.extension)};
	padding: 0.15rem;
	
	&:hover {
		color: white;	
	}
`;

const FileIcon = (props) => {
	return <StyledIcon {...props} type={getType(props.extension)} />
};

export default FileIcon;

function getType(type) {
	switch (type) {
		case 'mp3':
			return 'play-circle';
		case 'mp4':
			return 'video-camera';
		case 'txt':
		case 'doc':
		case 'pdf':
			return 'list';
		case 'Photos':
			return 'camera';
		case 'djvu':
			return 'bookmark';
		default:
			return '';
	}
}

function getIconBackground(type) {
	switch (type) {
		case 'mp3':
			return '#CE0000';
		case 'mp4':
			return '#154890';
		case 'txt':
		case 'doc':
		case 'pdf':
			return '#FF9E00';
		case 'Photos':
			return '#129793';
		case 'djvu':
			return '#97C30A';
		default:
			return '';
	}
}