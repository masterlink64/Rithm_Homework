import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

// need to create a store and inside our create store function
// we will need a reducer
const ourReduxStore = createStore(rootReducer);

ReactDOM.render(
  <Provider store={ourReduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
