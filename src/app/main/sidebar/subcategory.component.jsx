import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

class Subcategory extends React.Component {
	onClick = () => {
		this.props.onSubcategoryClick(this.props.index);
	};
	render() {
		const { className, subcategory } = this.props;
		return (
			<li className={className}>
				<a className="subcategory" onClick={this.onClick}>
					{subcategory}
				</a>
			</li>
		);
	}
}

Subcategory.defaultProps = {
	className: ''
};

Subcategory.propTypes = {
	className: PropTypes.string,
	index: PropTypes.number.isRequired,
	onSubcategoryClick: PropTypes.func.isRequired,
	subcategory: PropTypes.string.isRequired
};

export default styled(Subcategory)`
	margin-bottom: 0.5rem;
	list-style-type: none;
	
	.subcategory {
		color: ${props => props.theme.darkPrimaryColor};
	}
`;
