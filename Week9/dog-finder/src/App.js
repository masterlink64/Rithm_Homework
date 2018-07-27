import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Dog from './Dog';
import './App.css';

class App extends Component {
  // some kind of state?
  state = {
    Whiskey: {
      age: 9000,
      color: 'Black',
      funfact: 'loves foods'
    }
  };
  // conditonal to set state according to
  // this.props.match.params.name;

  render() {
    //let name = this.props.match.params.name;
    return (
      <div>
        <h1>Cute Dogs!</h1>
        <ul>
          <li>
            <Link to="/dog/Whiskey">Whiskey</Link>
          </li>
          <li>
            <Link to="/dog/Ollie">Ollie</Link>
          </li>
          <li>
            <Link to="/dog/Hazel">Hazel</Link>
          </li>
        </ul>
        {/* route for dog/:name so that it can be dynamic */}
        {/* use switch in order to handle 404 and redirects */}
        <Switch>
          {/* need to somehow pass down props to component in routes */}
          <Route
            exact
            path="/dog/:name"
            component={routeProps => (
              // this.props.match.params.name
              <Dog
                age={this.state.age}
                color={this.state.color}
                funfact={this.state.funfact}
                {...routeProps}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
