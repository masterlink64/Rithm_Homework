import React, { Component } from 'react';
import Dice from './Dice';
import './Table.css';

class Table extends Component {
  // table will have components such as Dices
  render() {
    return (
      <div className="Table">
        <Dice />
        <Dice />
        <Dice />
        <Dice />
      </div>
    );
  }
}

export default Table;
