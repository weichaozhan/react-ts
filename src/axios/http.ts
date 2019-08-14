/**
 * axios 请求封装
 * @param {Object} config axios 配置
 * @param {Boolean} isFormData 是否为FormData，true 不设置请求头
 */
import { message } from 'antd';

import axios from 'axios';
import Qs from 'qs';

const http = (config:any = {}) => {
  const isFormData = Object.prototype.toString.call(config.data) === '[object FormData]';
  let headers:any = {};

  if (
    !(config.headers && config.headers['Content-Type']) 
    && !isFormData
  ) {
    headers['Content-Type'] = 'application/json';
  }
  headers = {...headers, ...config.headers};

  let data:any = null;

  // Content-Type 为 application/x-www-form-urlencoded 并且 data 类型不为 formData 时序列化 data
  if (!isFormData) {
    data = (!headers['Content-Type'] || headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) ? Qs.stringify(config.data) : (config.data || '');
  } else {
    data = config.data;
  }

  const newRequest = new Promise((resolve, reject) => {
    axios(Object.assign({}, config, {
      url: config.url,
      method: config.method || 'get',
      headers: headers,
      data: data,
      params: config.params || '',
      timeout: config.timeout || 0,
    }))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return newRequest;
};

// 添加请求拦截器
axios.interceptors.request.use(config=> {
  return config;
}, err => {
  return Promise.resolve(err);
});
// 添加响应拦截器
axios.interceptors.response.use(data=> {
  return data;
}, err=> {
  const status = err.response && err.response.status;

  if (status === 504 || status === 404) {
    message.error('服务器被吃了⊙﹏⊙∥');
  } else if (status == 403) {
    message.error('权限不足,请联系管理员!');
  } else {
    message.error('请求超时!');
  }
  return Promise.reject(err);
});


export default http;
