import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavOrderTab from './nav_sorts';

import { fetchCategoryPosts, fetchPosts, orderByVote, orderByTime } from '../actions';

class Category extends Component {
  componentDidMount() { 
    this.props.fetchPosts();
  }

  renderPosts = () => {
    
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id}>
          <div className='post-title'>
            <Link to={`/posts/${post.id}`} >
              {post.title}
            </Link>
          </div>
          <div className='post-details'>
            <p>Score: {post.voteScore}</p>
            <p>Date: {moment(post.timestamp).format('MMM Do YY, HH:mm')}</p>
          </div>
          <div className='post-edit'>
            <Link to={`/posts/edit/${post.id}`}>
              <FontAwesome name='pencil-square-o' aria-hidden="true" />
            </Link>
          </div>
        </li>
      );
    });
  }
  
  render() {
    return (
      <div className='App'>
        <div className='sort-tab'>
          <h5>Sort by:</h5> <NavOrderTab orderByTime={this.props.orderByTime} orderByVotes={this.props.orderByVote} topic='posts' />
        </div>
        <h3 className='index'>Category: {this.props.match.params.cats}</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    posts: _.omitBy(posts, (post) => post.category !== ownProps.match.params.cats),
  }
}

export default connect(mapStateToProps, { fetchPosts, orderByVote, orderByTime })(Category);