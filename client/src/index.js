import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import MyForm from './components/contact/contact'

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MyForm />

  </React.StrictMode>,
  document.getElementById('root')
);

