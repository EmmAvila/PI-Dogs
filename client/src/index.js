import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './Store';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();


const {DF_AXIOS,DB_USER} = process.env;
console.log(process.env)
console.log(DB_USER)
axios.defaults.baseURL= process.env.REACT_APP_API || 'http://localhost:3001';

ReactDOM.render(
  <React.StrictMode >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
