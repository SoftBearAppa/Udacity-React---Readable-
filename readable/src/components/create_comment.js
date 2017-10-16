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
      this.props.fetchCommentDetails(this.props.match.params.postsid, this.props.match.params.commentsid);
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
      return this.props.editComment(postsid, commentsid, values, () => this.props.history.push(`/posts/${postsid}`));
    } else {
      values['parentId'] = postsid;
      values['id'] = Math.random().toString(36).substr(-8);;
      return this.props.createComment(postsid, values, () => this.props.history.push(`/posts/${postsid}`));
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='App'>
        <div className='form'>
          <h2>Create Comment</h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
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
            <div className='buttons'>
              <button type="submit">Add a post</button>
              <Link to='/'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  const { commentsid, postsid } = ownProps.match.params;
  if(commentsid && comments[postsid]) {
    return {
      initialValues: comments[postsid]
        .filter(comment => comment.id === commentsid)
        .reduce((comment, a) => {return a})
    }
  }
}

CreateComment = reduxForm({
  form: 'CreateComment',
})(CreateComment)

export default connect(mapStateToProps, { createComment, fetchCommentDetails, editComment })(CreateComment);