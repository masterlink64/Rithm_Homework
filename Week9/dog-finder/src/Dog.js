import React, { Component } from 'react';
import App from './App';
import { Route, Link } from 'react-router-dom';

export default class Dog extends Component {
  // state = {
  //   whiskey: { id: 0, img: 'pix', facts: [] },
  //   hazel: {}
  // };
  state = {
    dogs: [{ name: 'whiskey', id: 0, img: 'px', facts: [] }]
  };
  render() {
    return (
      //
      <div>
        <div>
          <ul>
            <li>age: {this.props.age}</li>
            <li>color: {this.props.color}</li>
            <li>fun fact: {this.props.funfact}</li>
          </ul>
        </div>
      </div>
    );
  }
}
