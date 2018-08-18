import React, { Component } from 'react';

class NewBoxForm extends Component {
  state = {
    width: 200,
    height: 200,
    backgroundColor: 'gold'
  };

  handleChangeWidth = evt => {
    this.setState({
      width: evt.target.value
    });
  };
  handleChangeHeight = evt => {
    this.setState({
      height: evt.target.value
    });
  };
  handleChangebackgroundColor = evt => {
    this.setState({
      backgroundColor: evt.target.value
    });
  };

  collectInput = evt => {
    evt.preventDefault();
    // ???? logic
    // or pass in this.state
    const newBox = {
      width: this.state.width,
      height: this.state.height,
      backgroundColor: this.state.backgroundColor
    };
    this.props.boxInfo(newBox);
    this.setState({
      // set to default
      width: 200,
      height: 200,
      backgroundColor: 'gold'
    });
  };
  render() {
    return (
      <form onSubmit={this.collectInput}>
        <label htmlFor="width">
          <input
            type="number"
            id="width"
            value={this.state.width}
            onChange={this.handleChangeWidth}
          />
        </label>
        <label htmlFor="height">
          <input
            type="number"
            id="height"
            value={this.state.height}
            onChange={this.handleChangeHeight}
          />
        </label>
        <label htmlFor="backgroundColor">
          <input
            type="text"
            id="backgroundColor"
            value={this.state.backgroundColor}
            onChange={this.handleChangebackgroundColor}
          />
        </label>
        <button type="submit">NEW BOX!!!</button>
      </form>
    );
  }
}

export default NewBoxForm;
