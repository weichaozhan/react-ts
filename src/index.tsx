import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import App from './App';

const env = process.env.NODE_ENV;
!!window.__webpack_require__ && (window.__webpack_require__.p = (env === 'production' ? '/rpage/' : '/'));

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);