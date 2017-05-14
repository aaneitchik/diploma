import React from 'react';
import Tags from 'react-tagging-input';

import { inputShape } from '../utils/common-proptypes';

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
	render() {
		return (
			<Tags
				tags={this.props.input.value}
				uniqueTags
				onAdded={this.addTag}
				onRemoved={this.removeTag}
				placeholder="Добавьте тег"
			/>
		);
	}
}

TagInput.propTypes = {
	input: inputShape.isRequired
};

export default TagInput;
