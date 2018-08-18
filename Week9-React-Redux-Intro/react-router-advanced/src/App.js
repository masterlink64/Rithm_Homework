import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import './App.css';
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};

const Login = props => (
  <div>
    <h1>Login</h1>
  </div>
);
const Home = props => {
  return (
    <div>
      <h1>Homepage</h1>
      {/* nested route */}
      <Route path="/taco" component={props => <small>theres a taco</small>} />
    </div>
  );
};

const About = props => <h1>About</h1>;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const Protected = props => <h1> This is a protected secret</h1>;

const NotFound = props => (
  <h1>{`${props.location.pathname} is not a valid route for this app.`}</h1>
);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* need to take off exact so that it allows us to match '/' first otherwise
         the nested routes parent's wont be rendered */}
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={Protected} />

          {/* 404 handler is the last thing because itll match if nothing else is matched! */}
          {/* <Route component={NotFound} /> */}
          {/* redirect home */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
