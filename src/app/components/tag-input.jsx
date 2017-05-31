import React from 'react';
import Tags from 'react-tagging-input';

import { inputShape } from '../utils/common-proptypes';

const addKeys = [13, 32];

class TagInput extends React.Component {
	addTag = tag => {
		const newTags = [...this.props.input.value, tag];
		this.props.input.onChange(newTags);
	};
	removeTag = (tag, index) => {
		const newTags = [...this.props.input.value];
		newTags.splice(index, 1);
		this.props.input.onChange(newTags);
	};
	stopPropagation = event => {
		if (addKeys.includes(event.keyCode)) {
			event.preventDefault();
		}
	};
	render() {
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<span onKeyDown={this.stopPropagation}>
				<Tags
					tags={this.props.input.value}
					uniqueTags
					addKeys={addKeys}
					onAdded={this.addTag}
					onRemoved={this.removeTag}
					placeholder="Добавьте тег"
				/>
			</span>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}
}

TagInput.propTypes = {
	input: inputShape.isRequired
};

export default TagInput;
