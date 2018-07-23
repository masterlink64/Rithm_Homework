import React, { Component } from 'react';
import Todo from './Todo';
import './TodoList.css';

export default class TodoList extends Component {
  render() {
    // map out an arr of todo tasks
    // when making a todo component will need to add logic whether it had been clicked?
    const todos = this.props.todosArr.map((todo, idx) => (
      <li key={idx}>
        <Todo todo={todo.todo} />
      </li>
    ));
    return (
      <div className="TodoList">
        {/* will render all the todos */}
        <ol>{todos}</ol>
      </div>
    );
  }
}
