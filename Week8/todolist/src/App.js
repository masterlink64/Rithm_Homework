import React, { Component } from 'react';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';
import './App.css';

class App extends Component {
  state = {
    todosArr: [{ todo: 'have fun' }, { todo: 'learn React' }]
  };
  addTodo = obj => {
    this.setState({
      todosArr: [...this.state.todosArr, obj]
    });
  };
  render() {
    return (
      <div className="App">
        {/* will render the newtodo form and the todolist components */}
        <TodoList todosArr={this.state.todosArr} />
        <NewTodoForm newTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
