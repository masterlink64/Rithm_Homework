import React, { Component } from 'react';

export default class Todo extends Component {
  render() {
    return (
      <div>
        {/* will need to pass task from parents */}
        <li>{this.props.task}</li>
      </div>
    );
  }
}
