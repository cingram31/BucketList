import React, { Component, PropTypes } from 'react';
import { initialize, reduxForm } from 'redux-form';
import { fetchPost, updatePost } from '../../actions/index';
import { Link } from 'react-router';
import axios from 'axios';

const { DOM: { input, select, textarea } } = React;

const ROOT_URL = 'http://localhost:3000';

const config = {
   headers: { authorization: localStorage.getItem('token') }
}

class UpdateList extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	componentDidMount() {
		this.props.fetchPost(this.props.params.id);
	}

	handleFormSubmit(formProps){
		//TODO - make this an update Post 
	    this.props.updatePost(formProps, this.props.params.id);
	}

	render() {
		const { fields: { title, topic, url, content }, handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<h3>Update Post</h3>
				
				<fieldset className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" {...title} value={this.state.post.title} onBlur={this.handleChange} />
				</fieldset>
				<fieldset className="form-group">
					<label>Category</label>
					<input type="text" className="form-control" {...topic} />
				</fieldset>
				<fieldset className="form-group">
					<label>URL</label>
					<input type="text" className="form-control" {...url} />
				</fieldset>
				<fieldset className="form-group">
					<label>Content</label>
					<textarea type="text" rows="8" className="form-control text" {...content} />
				</fieldset>

				<button type="submit" className="btn btn-primary">Save</button>
				<Link to="/items" className="btn btn-danger">Cancel</Link>
			</form>
		);

	}
}

UpdateList.PropTypes = {
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	fetchPost: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { initialValues: state.posts.post };
}

const fields = ['title', 'topic', 'url', 'content']

export default reduxForm({
	form: 'UpdateNewForm',
	fields: fields
}, 

mapStateToProps,

{fetchPost, updatePost})(UpdateList);
