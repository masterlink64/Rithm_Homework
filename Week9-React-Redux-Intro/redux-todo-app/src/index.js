import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';

const myReduxStore = createStore(
  rootReducer,
  // 2nd param is redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={myReduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
