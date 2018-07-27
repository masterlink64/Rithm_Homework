import React, { Component } from 'react';
import App from './App';
import { Route, Link } from 'react-router-dom';

export default class Machine extends Component {
  render() {
    return (
      <div className="Machine">
        <h1>STEVE'S AWESOME VENDING MACHINE</h1>
        <div>
          {/* link to each vending items */}
          <Link to="/soda">Get a Soda</Link>
        </div>
        <div>
          <Link to="/chips">Eat Chips</Link>
        </div>
        <div>
          <Link to="/sardines">Gross Sardines</Link>
        </div>
      </div>
    );
  }
}
