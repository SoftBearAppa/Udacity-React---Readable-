import React, { Component } from 'react';
import { connect } from 'react-redux';

class Category extends Component {
  componentDidMount() { 
    const { cats } = this.props.match.params
    console.log(cats);
  }
  
  render() {
    return (
      <div>
        <h3>Category</h3>
      </div>
    );
  }
}

export default connect(null, null)(Category);