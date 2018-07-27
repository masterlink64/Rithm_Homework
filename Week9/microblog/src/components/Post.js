import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <h3>{this.props.body}</h3>
        <button onClick={this.props.delete}>Delete Me!</button>
      </div>
    );
  }
}
