import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    console.log(this.props.categories);
    return (
      <div className="App">
        Gettng started on Project: Readable
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  }
}

export default connect(mapStateToProps, { fetchCategories } )(App);
