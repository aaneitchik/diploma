import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as fileActions from './file';

import Button from '../components/button';

class File extends React.Component {
	componentDidMount() {
		const fileId = this.props.match.params.id;
		this.props.getFileById(fileId);
	}

	render() {
		const { file } = this.props;
		return (
			<div className={`uk-card uk-card-default ${this.props.className}`}>
				<h4 className="title">{file.title}</h4>
				<h5 className="author">{file.author}</h5>
				<p>{file.shortDescription}</p>
				<p>{file.description}</p>
				<Button>Load File</Button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { file: state.file.current };
}

const styledFile = styled(File)`
	padding: 1.5rem;
	font-family: SourceSansPro-Light, sans serif;
	
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
