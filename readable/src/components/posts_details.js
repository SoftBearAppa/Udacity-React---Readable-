import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchPostDetails } from '../actions';

class PostDetails extends Component {
  componentDidMount() {
    const { postsid } = this.props.match.params
    this.props.fetchCategories();
    this.props.fetchPostDetails(postsid);
  }
  render() {
    const { title, body, author, voteScore, timestamp } = this.props.posts;
    return (
      <div>
        <h2>{title}</h2>
        <h5>{author}</h5>
        <div>{body}</div>
        <div>{voteScore}</div>
        <div>{moment({timestamp}).format('HH:mm:ss, MMM Do YY')}</div>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}
export default connect(mapStateToProps, { fetchCategories, fetchPostDetails })(PostDetails);