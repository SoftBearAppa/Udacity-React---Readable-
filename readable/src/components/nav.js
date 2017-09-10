import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends Component {

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
      <ul>
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps)(Nav)