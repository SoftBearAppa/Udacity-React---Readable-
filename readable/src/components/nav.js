import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories } from '../actions'

class Nav extends Component {
  componentDidMount() {
    this.props.fetchCategories();
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

  render() {
    return(
      <ul className='nav'>
        <div className='nav-options'>
          <li key='nav-home' ><Link className='nav-home' to='/'>Home</Link></li>
          <div className='nav-add-post-wrapper'>
            <li className='add-post' key='nav-add-post'><Link
          to='/posts/new'><FontAwesome name='plus' aria-hidden='true' ></FontAwesome></Link>
            </li>
          </div>
          {this.renderCategories()}
        </div>
      </ul>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps, { fetchCategories })(Nav)