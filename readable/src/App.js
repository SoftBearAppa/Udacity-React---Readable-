import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchPosts } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  renderCategories = () => {
    return _.map(this.props.categories, cats => {
      return (
        <li key={cats.name}>
          <Link to={`/category/${cats.name}`} >
            {cats.name}
          </Link>
        </li>
      );
    });
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
      <div className="App">
        Gettng started on Project: Readable
        <h2>Categories</h2>
        <ul className='list-group'>
          {this.renderCategories()}
        </ul>
        <h3>Post Index</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts:state.posts,
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPosts } )(App);
