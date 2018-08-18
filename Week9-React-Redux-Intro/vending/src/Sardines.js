import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default class Sardines extends Component {
  render() {
    return (
      <div>
        <h1>SARDINES everywhere!!!! WHAATT</h1>
        <h2>
          <Link to="./">Go back to Vending Machine</Link>
        </h2>
      </div>
    );
  }
}
