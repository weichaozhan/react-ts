/**
 * @description 全局接口
 */
import http from '../axios/http.js';

/**
 * @description 用户信息查询接口
 */
export const getUserMsgAPI = () => {
  return http({
    url: '/user',
  });
};

/**
 * @description 获取语音文件
 */
export const getAsrAudioFileAPI = (data: any = {}) => {
  return http({
    method: 'get',
    url: '/audio',
    data,
    responseType: 'arraybuffer',
  });
};
