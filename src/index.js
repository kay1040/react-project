import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.less';
import { Provider } from "react-redux";
import store from "./store"
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// 設置移動端適配
// 除以多少視口的寬度就是多少rem，現在我們設置視口的總寬度為750rem
// document.documentElement.style.fontSize = 100 / 750 + 'vw';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router basename='/flower-field/'>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
);
