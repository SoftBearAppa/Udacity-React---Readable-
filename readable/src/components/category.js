import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategoryPosts } from '../actions';
import Nav from './nav';

class Category extends Component {
  componentDidMount() { 
    const { cats } = this.props.match.params
    this.props.fetchCategoryPosts(cats);
  }

  renderPosts = () => {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`} >
            {post.title}
          </Link>
        </li>
      );
    });
  }
  
  render() {
    return (
      <div>
        <Nav />
        <h3>Category: {this.props.match.params.cats}</h3>
        <ul>
          {this.renderPosts()}
        </ul>
        
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    posts: posts,
  }
}

export default connect(mapStateToProps, { fetchCategoryPosts })(Category);