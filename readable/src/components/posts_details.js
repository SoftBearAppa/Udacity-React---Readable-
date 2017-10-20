import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost, fetchCategories, fetchPostDetails, votePost } from '../actions';
import Comments from './comments';

class PostDetails extends Component {
  componentDidMount() {
    const { postsid } = this.props.match.params
    this.props.fetchPostDetails(postsid);
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
      return <div className='App'>
                <div className='no-post'>
                  <h3>404 Post not Found</h3>
                </div>
              </div>
    }
    const { title, author, timestamp, body, id, voteScore } = this.props.post;
    return (
      <div className='App'>
        <div className='post'>
          <div className='post-details'>
            <h2>{title}</h2>
            <h5>Author: {author}</h5>
            <h6>
              {moment(timestamp).format('MMM Do YY, HH:mm')}
            </h6>
            <hr/>
            <div className='post-body'>
              {body}
            </div>
          </div>
            <div className='post-options'>
              <div className='post-score'>
                {this.renderVote(id, voteScore)}
              </div>
              <div className='post-edits'>
                <Link to={`/posts/edit/${post.id}`}>
                  <FontAwesome name='pencil-square-o' aria-hidden="true" />
                </Link>
                <Link to={`/posts/${this.props.match.params.postsid}/comments/new`}><FontAwesome name='commenting' aria-hidden='true'></FontAwesome>
                </Link>
                <FontAwesome name='trash-o' aria-hidden="true" onClick={() => this.props.deletePost(this.props.match.params.postsid, () => this.props.history.push('/'))} />
              </div>
            </div>
            <div className='divider'>
              <hr/>
            </div>
        </div>
          <Comments />
      </div>


    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.postsid],
  }
}
export default connect(mapStateToProps, { deletePost, fetchCategories, fetchPostDetails, votePost })(PostDetails);