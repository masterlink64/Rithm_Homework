import React, { Component } from 'react';
import Coin from './Coin';
import head from './head.jpg';
import tail from './tails.jpg';
import './Board.css';

class Board extends Component {
  // static defaultProps = {
  //   sides: [head, tail]
  // };
  // state of the board
  // pass down image
  // number of flip
  // which img to display
  constructor(props) {
    super(props);
    console.log('board constructor');
    this.state = {
      side: head,
      numFlip: 0,
      headCount: 0,
      tailCount: 0
    };
  }
  flipCoin() {
    // randomize for head or tails
    // set state
    // set variable of coin

    let currentSide = Math.random() < 0.5 ? head : tail;
    this.setState({ side: currentSide });
    this.setState({ numFlip: this.state.numFlip + 1 });
    if (currentSide === head) {
      this.setState({ headCount: this.state.headCount + 1 });
    } else {
      this.setState({ tailCount: this.state.tailCount + 1 });
    }
  }
  render() {
    return (
      <div className="Board">
        <h2>FLIPPING COINS</h2>
        <Coin side={this.state.side} />
        <button className="Board-btn" onClick={evt => this.flipCoin()}>
          Flip this Coin!
        </button>
        <div>
          Out of {this.state.numFlip} flips, there have been{' '}
          {this.state.headCount} head and {this.state.tailCount} tails
        </div>
      </div>
    );
  }
}

export default Board;
