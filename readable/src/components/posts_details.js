import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchComments, fetchPostDetails } from '../actions';
import Comments from './comments';

class PostDetails extends Component {
  componentDidMount() {
    const { postsid } = this.props.match.params
    this.props.fetchCategories();
    this.props.fetchPostDetails(postsid);
    this.props.fetchComments(postsid);
  }

  render() {
    const { title, body, author, voteScore, timestamp } = this.props.posts;
    return (
      <div>
        <h2>{title}</h2>
        <h5>{author}</h5>
        <h6>{moment(timestamp).format('MMM Do YY, HH:mm') }</h6>
        <div>{body}</div>
        <div>{voteScore}</div>
        <div>
          <Comments />
        </div>
      </div>


    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}
export default connect(mapStateToProps, { fetchCategories, fetchComments, fetchPostDetails })(PostDetails);