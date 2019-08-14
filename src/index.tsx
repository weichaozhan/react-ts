import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

import '@babel/polyfill';

import {
  BASE_NAME,
} from './constant/global';
import App from './App';

import './index.module.less';

const env = process.env.NODE_ENV;
!!window.__webpack_require__ && (window.__webpack_require__.p = (env === 'production' ? '/rpage/' : '/'));

export const history = createHashHistory({
  basename: BASE_NAME,
});

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector('#app')
);