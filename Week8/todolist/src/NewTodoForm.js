import React, { Component } from 'react';
import uuidv1 from 'uuid/v1'; // const uuidv1 = require('uuid/v1');

export default class NewTodoForm extends Component {
  state = {
    todo: ''
  };

  // handle change function which allows react to
  handleChange = evt => {
    this.setState({
      todo: evt.target.value
    });
  };
  // sendData function will handle when we submit form to send data UP to parent
  // it will reset state as well
  sendData = evt => {
    evt.preventDefault();
    // this.state
    this.props.newTodo(this.state);
    // this is where you uuid or the boolean
    // something similar
    // this.props.createBox({ ...this.state, id: uuidv1() });
    // reset state
    this.setState({
      todo: ''
    });
  };
  render() {
    return (
      <form onSubmit={this.sendData}>
        <label htmlFor="todo">Thing I need todo!</label>
        <input
          onChange={this.handleChange}
          type="text"
          id="todo"
          value={this.state.todo}
        />
        <button type="submit">Add new todo</button>
      </form>
    );
  }
}
