import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.less';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/flower-field/">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
