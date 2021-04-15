import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MyComponent from './App';
import App from './Table';

ReactDOM.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>,
  document.getElementById('date-picker')
);

ReactDOM.render(
  <React.StrictMode>
   <App />
  </React.StrictMode>,
  document.getElementById('table')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
