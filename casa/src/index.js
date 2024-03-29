// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// Reports during the build
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
