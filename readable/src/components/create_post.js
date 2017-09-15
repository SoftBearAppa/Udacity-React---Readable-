import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';


import { createPost, fetchPostDetails } from '../actions';

class CreatePost extends Component {
  componentDidMount() {
    if (this.props.match.params.postsid) {
      this.props.fetchPostDetails(this.match.params.postsid);
    }
  }

  renderField = (field) => {
    return (
      <div>
        <label>{field.label}</label>
        {field.type === 'select' ? (
          <field.type 
            type='text' 
            disabled={field.onEditDisabled} 
            {...field.input}
          >
            
            <option disabled></option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </field.type>
        ) : (
          <field.type 
            type='text'
            disabled={field.onEditDisabled}
            {...field.input}
          />
        )}
      </div>
    )
  }

  onSubmit = (values) => {
    console.log(this.props);
    values['id'] = Math.random().toString(36).substr(-8);
    values['timestamp'] = Date.now();
    this.props.createPost(values);
  }

  render() {
    console.log(this.props);
    const { handleSubmit } = this.props
    const disabled = this.props.match.params.postId ? true : false
    return(
      <div>
        Testing new form
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Title"
            name="title"
            type="input"
            component={this.renderField}

          />
          <Field
            label="Author"
            name="author"
            type="input"
            component={this.renderField}
            onEditDisable={disabled}
          />
          <Field
            label="Content for this Post"
            name="body"
            type="textarea"
            component={this.renderField}
          />
          <Field
            label="Select a category for this Post"
            name="category"
            type="select"
            component={this.renderField}
            onEditDisable={disabled}
          />
          <button type="submit">Add a post</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

CreatePost = reduxForm({
  form: 'CreatePost',
})(CreatePost);

export default connect(null, { createPost, fetchPostDetails })(CreatePost);