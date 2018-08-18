import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// form is connected because that's how it will update the
// redux state
class NewToDoForm extends Component {
  state = {
    task: '',
    id: ''
  };
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    // DISPATCH to update task/todos when you submit form
    this.props.dispatch({
      type: 'ADD_TODO',
      todo: {
        task: this.state.task,
        id: uuid()
      }
    });
    this.setState({
      task: ''
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            value={this.state.task}
            name="task"
            onChange={this.handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

export default connect()(NewToDoForm);
