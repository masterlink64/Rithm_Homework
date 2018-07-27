import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from '../components/Todo';

class TodoList extends Component {
  render() {
    const todos = this.props.todos.map(todo => (
      <Todo key={todo.id} task={todo.task} />
    ));
    // todos are coming from redux state
    return (
      <div>
        <ul>{todos}</ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  // runs before renders even run
  // always return an object and the keys will be place onto props of react
  return {
    todos: reduxState.todos
  };
}

// connect will return a function, need to IIF right after
// and pass in the componenet you want to connect
// connect will run mapStateToProps!!!
export default connect(mapStateToProps)(TodoList);
