import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Comments extends Component {

  renderComments = () => {
    return (
      _.map(this.props.comments, comment => {
        return (
          <div>
            <h5>{comment.body}</h5>
            <h6>{moment(comment.timestamp).format('MMM Do YY, HHmm')}</h6>
            <h6>{comment.author}</h6>
          </div>
        )
      })
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

export default connect(mapStateToProps, null)(Comments);