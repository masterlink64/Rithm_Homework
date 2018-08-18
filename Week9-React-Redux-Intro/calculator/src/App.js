import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

const Math = props => {
  // props.match.params.operation
  const oper = props.match.params.operation;
  const num1 = props.match.params.num1;
  const num2 = props.match.params.num2;
  let ans;

  // logic for each operation
  // add
  if (oper === 'add') {
    ans = +num1 + +num2;
  }
  if (oper === 'subtract') {
    ans = +num1 - +num2;
  }
  if (oper === 'divide') {
    ans = +num1 / +num2;
  }
  if (oper === 'multiply') {
    ans = +num1 * +num2;
  }
  //RENDER the operation with return
  return (
    <div>
      <h1>The Answer is: {ans}</h1>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <div>
        <h1>Calculator App!</h1>
        <Route exact path="/:operation/:num1/:num2" component={Math} />
      </div>
      // routes!
    );
  }
}

export default App;
