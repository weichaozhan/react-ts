/**
 * @description 全局接口
 */
import http from '../axios/http';

/**
 * @description 用户信息查询接口
 */
export const getUserMsgAPI = () => {
  return http({
    url: '/api/user/current',
  });
};

/**
 * @description 用户权限查询接口
 */
export const getUserAuthAPI = () => {
  return http({
    url: '/api/auth/perms',
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
