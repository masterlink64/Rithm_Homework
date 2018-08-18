import React, { Component } from 'react';
import axios from 'axios';

export default class GifForm extends Component {
  // needs local state to keep track of changes
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    // can also bind things here
  }
  // build handle change and handle submit functions
  // use arrow function for correct "this" binding
  handleChange = evt => {
    // to handle change in react state need to set state
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    // need to send this searchTerm to parent (App.js) so that it can enter into Gif
    console.log('submitting');
    this.props.search(this.state.searchTerm);
    this.setState({
      searchTerm: ''
    });
  };
  render() {
    return (
      <div>
        <h1>Search for your Favorite Gifs</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchTerm">Search:</label>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="Whatever you want"
            name="searchTerm"
          />
          {/* instead of button you can use input type='submit' value ='WHATEVER YOU WANT SUBMIT BUTTON TO LOOK LIKE' */}
          <button type="submit">Search!!!</button>
        </form>
      </div>
    );
  }
}
