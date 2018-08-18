import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div
        className="Box"
        style={{
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.backgroundColor
        }}
      />
    );
  }
}

export default Box;
