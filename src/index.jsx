import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import history from './history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
