import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { createComment } from '../actions';

class CreateComment extends Component {

  renderField = (field) => {
    return (
      <div>
        <label>{field.label}</label>
        <field.type
          type='text'
          disabled={field.onEditDisabled}
          {...field.input}
        />
      </div>
    )
  }

  onSubmit = (values) => {
    const { postsid } = this.props.match.params;
    values['parentId'] = postsid;
    values['id'] = Math.random().toString(36).substr(-8);;
    values['timestamps'] = Date.now();
    return this.props.createComment(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          Test
          <Field 
            label='Author'
            name='author'
            type='input'
            component={this.renderField}
          />
          <Field
            label='Comment'
            name='body'
            type='textarea'
            component={this.renderField}
          />
          <button type="submit">Add a post</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    )
  }
}

CreateComment = reduxForm({
  form: 'CreateComment',
})(CreateComment)

export default connect(null, { createComment })(CreateComment);