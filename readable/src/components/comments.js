import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import NavOrderTab from './nav_sorts';

import { deleteComment, fetchComments, voteComment, orderByVote, orderByTime } from '../actions';

class Comments extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.match.params.postsid)
  }

  renderComments = () => {
    const { comments, sorts } = this.props;
    const sort = sorts.order === 'byVotes' ? _.sortBy(comments, (comment) => comment.voteScore) : _.sortBy(comments, (comment) => comment.timestamp)
    return (
      _.map(sort, comment => {
        return (
          <div key={comment.id}>  
            <h5>{comment.body}</h5>
            <h6>{moment(comment.timestamp).format('MMM Do YY, HHmm')}</h6>
            <h6>{comment.author}</h6>
            {this.renderVote(comment.id, comment.voteScore)}
            <br />
            <Link to={`/posts/${this.props.match.params.postsid}/comments/edit/${comment.id}`} >
              <FontAwesome name='pencil-square-o' aria-hidden="true" />
            </Link>
            <br/>
              <FontAwesome name='trash-o' aria-hidden="true" onClick={() => { this.props.deleteComment(this.props.match.params.postsid, comment.id) }}/>
          </div>
        )
      })
    )
  }

  renderVote = (commentid, voteScore) => {
    return (
      <div>
        <Link to='#' onClick={() => this.props.voteComment(this.props.match.params.postsid, commentid, 'upVote')}>&#x25B2;</Link>
      Score: {voteScore}
      <Link to="#" onClick={() => this.props.voteComment(this.props.match.params.postsid, commentid, "downVote")}>&#x25BC;</Link>
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
          <NavOrderTab orderByTime={this.props.orderByTime} orderByVotes={this.props.orderByVote} topic='comments'/>
        {this.renderComments()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteComment, fetchComments, voteComment, orderByVote, orderByTime
  }, dispatch)
}

function mapStateToProps({ comments, sorts }, ownProps) {
  return {
    comments: comments[ownProps.match.params.postsid],
    sorts: sorts.comments
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));