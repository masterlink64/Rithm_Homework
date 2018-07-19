import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    // list all of todo list
    // should have an array called todos
    let todos = [
      {
        name: 'relax',
        id: 1,
        done: false
      },
      {
        name: 'study',
        id: 2,
        done: false
      },
      {
        name: 'have fun',
        id: 3,
        done: false
      }
    ];
    // it should list all of the Todo components
    return todos.map(t => {
      return <Todo name={t.name} key={t.id} done={t.done} />;
    });
  }
}

// Todo component should display the task necessary to complete
class Todo extends Component {
  render() {
    const { name, done } = this.props;
    return <li>{name}</li>;
  }
}

export default TodoList;
