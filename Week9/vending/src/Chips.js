import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default class Chips extends Component {
  // state of chips
  // vs state = {chipCount:0} when you can and easier to read
  // usually constructor for more
  constructor(props) {
    super(props);
    this.state = {
      chipCount: 0
    };
  }
  // functions for eat chips
  eatChips = () => {
    // when you want to setState want due to a condition
    // usually you want to only have one set state though
    // if (this.state.chipCount == 7) {
    //   this.setState({chipCount: 0})
    // };

    // set state of chips by adding +1
    this.setState({
      chipCount: this.state.chipCount + 1
    });
    // pass in function if you want to have most up to date state
    // this.setState(st => ({
    //   chipCount: st.chipCount + 1
    // });
  };
  render() {
    return (
      <div>
        <button onClick={this.eatChips}>Eat a Chip</button>
        <Link to="/">Back to the Machine</Link>
        <h2>You ate {this.state.chipCount} chips</h2>
      </div>
    );
  }
}
