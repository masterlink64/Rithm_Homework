import React, { Component } from 'react';

export default class Todo extends Component {
  render() {
    console.log(this.props);
    // this is where you add button in order to edit it
    return <div className="Todo">{this.props.todo}</div>;
  }
}
