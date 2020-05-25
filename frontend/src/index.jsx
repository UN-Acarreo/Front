import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';


import Top from '../src/components/top/index.jsx';
import RegisterForm from '../src/components/registerForm/index.jsx';

import App from './scenes/app/index.jsx';


if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'UN-Acarreo:*');
}

ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>   
  , document.getElementById('root')
);