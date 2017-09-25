import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { createComment, editComment, fetchCommentDetails } from '../actions';

class CreateComment extends Component {

  componentDidMount() {
    if (this.props.match.params.commentsid) {
      console.log('match found');
      this.props.fetchCommentDetails(this.props.match.params.commentsid);
    }
  }

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
    const { postsid, commentsid } = this.props.match.params;
    values['timestamp'] = Date.now();
    if(commentsid) {
      return this.props.editComment(commentsid, values);
    } else {
      values['parentId'] = postsid;
      values['id'] = Math.random().toString(36).substr(-8);;
      return this.props.createComment(values);
    }
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

function mapStateToProps({ comments }, ownProps) {
  const { commentsid } = ownProps.match.params;
  if(commentsid) {
    return {
      initialValues: comments[commentsid]
    }
  }
}

CreateComment = reduxForm({
  form: 'CreateComment',
})(CreateComment)

export default connect(mapStateToProps, { createComment, fetchCommentDetails, editComment })(CreateComment);