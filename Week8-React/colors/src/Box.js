import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  // can use state = {} but not sure if I'll
  // need props
  static defaultProps = {
    colors: [
      'blue',
      'green',
      'red',
      'magenta',
      'shell',
      'salmon',
      'lime',
      'gold'
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      // need to get random color for an array?
      color: this.getRandomColor()
    };
  }

  getRandomColor() {
    return this.props.colors[Math.floor(Math.random() * 8)];
  }
  // make function to change color
  changeColor() {
    this.setState({ color: this.getRandomColor() });
  }

  render() {
    // console.log(this.getRandomColor());
    // this is where you render your HTML
    // show what you know!
    return (
      <div
        className="Box"
        onClick={evt => this.changeColor()}
        style={{ backgroundColor: this.state.color }}
      >
        Steve's Fun Box
      </div>
    );
  }
}

export default Box;
