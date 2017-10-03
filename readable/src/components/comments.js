import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { deleteComment, fetchComments, voteComment } from '../actions';

class Comments extends Component {
  componentDidMount() {
    console.log('component did mount.');
    this.props.fetchComments(this.props.match.params.postsid)
  }

  renderComments = () => {
    console.log('starting renderComments');
    console.log(this.props);
    return (
      _.map(this.props.comments, comment => {
        console.log(comment);
        return (
          <div key={comment.id}>  
            <h5>{comment.body}</h5>
            <h6>{moment(comment.timestamp).format('MMM Do YY, HHmm')}</h6>
            <h6>{comment.author}</h6>
            {this.renderVote(comment.id, comment.voteScore)}
            <br />
            <Link to={`/posts/:postsid/comments/edit/${comment.id}`} >
              edit
            </Link>
            <br/>
            <button onClick={() => {console.log(this.props);this.props.deleteComment(this.props.match.params.postsid, comment.id)}}>Delete</button>
          </div>
        )
      })
    )
  }

  renderVote = (commentid, voteScore) => {
    return (
      <div>
        <Link to='#' onClick={() => this.props.voteComment(commentid, 'upVote')}>&#x25B2;</Link>
      Score: {voteScore}
      <Link to="#" onClick={() => this.props.voteComment(commentid, "downVote")}>&#x25BC;</Link>
      </div>
    )
  }
  
  render() {
    const { comments } = this.props;
    if(!comments) {
      return <div>Loading Comments...</div>
    }

    return(
      <div>
        {this.renderComments()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteComment, fetchComments, voteComment
  }, dispatch)
}

function mapStateToProps({ comments }, ownProps) {
  console.log(comments);
  console.log(ownProps);
  return {
    comments: comments[ownProps.match.params.postsid],
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));