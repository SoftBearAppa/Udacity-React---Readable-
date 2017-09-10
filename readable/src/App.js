import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories, fetchPosts } from './actions';
import Nav from './components/nav';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
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
        <Nav />
        <h3>Post Index</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPosts } )(App);
