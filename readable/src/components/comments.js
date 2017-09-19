import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { voteComment } from '../actions';

class Comments extends Component {

  renderComments = () => {
    return (
      _.map(this.props.comments, comment => {
        return (
          <div key={comment.id}>
            <h5>{comment.body}</h5>
            <h6>{moment(comment.timestamp).format('MMM Do YY, HHmm')}</h6>
            <h6>{comment.author}</h6>
            {this.renderVote(comment.id, comment.voteScore)}
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
    const {comments} = this.props;
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

function mapStateToProps({ comments }) {
  return {
    comments,
  }
}

export default connect(mapStateToProps, { voteComment })(Comments);