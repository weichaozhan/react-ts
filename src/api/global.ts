/**
 * @description 全局接口
 */
import http from '../axios/http.js';

/**
 * @description 用户信息查询接口
 */
export const getUserMsgAPI = () => {
  return http({
    url: '/query/login/user',
  });
};
