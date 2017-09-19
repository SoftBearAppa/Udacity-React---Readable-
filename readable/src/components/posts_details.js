import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchComments, fetchPostDetails, votePost } from '../actions';
import Comments from './comments';

class PostDetails extends Component {
  componentDidMount() {
    const { postsid } = this.props.match.params
    this.props.fetchPostDetails(postsid);
    this.props.fetchComments(postsid);
  }

  renderVote = (postsid, voteScore) => {
    return (
      <div>
        <Link onClick={() => this.props.votePost(postsid, "upVote")} to="#">&#x25B2;</Link>
        Score: {voteScore}
        <Link onClick={() => this.props.votePost(postsid, "downVote")} to="#">&#x25BC;</Link>        
      </div>
    )
  }

  render() {
    const { post } = this.props
    if (!post) {
      return <div>loading....</div>
    }
    const { title, author, timestamp, body, id, voteScore } = this.props.post;
    return (
      <div>
        <h2>{title}</h2>
        <h5>{author}</h5>
        <h6>{moment(timestamp).format('MMM Do YY, HH:mm') }</h6>
        <div>{body}</div>
          <div>{this.renderVote(id, voteScore)}</div>
        <div>
          <Comments />
        </div>
      </div>


    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.postsid]
  }
}
export default connect(mapStateToProps, { fetchCategories, fetchComments, fetchPostDetails, votePost })(PostDetails);