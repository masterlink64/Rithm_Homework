import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import App from './App';

export default class Soda extends Component {
  render() {
    return (
      <div>
        {/* image of soda and link to go back to home */}
        <h1>SODA</h1>
        <h2>
          <Link to="/">NO MORE SUGAR!!!</Link>
        </h2>
        {/* route for home? */}
        <Route exact path="/" component={App} />
      </div>
    );
  }
}
