import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Soda from './Soda';
import Chips from './Chips';
import Sardines from './Sardines';
import Machine from './Machine';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* use SWITCH */}
        {/* routes for each component we can buy */}
        {/* to pass in props must use () => (component={Chips(whatever)}) */}
        <Route exact path="/soda" component={Soda} />
        <Route exact path="/chips" component={Chips} />
        <Route exaxt path="/sardines" component={Sardines} />
        <Route exact path="/" component={Machine} />
      </div>
    );
  }
}

export default App;
