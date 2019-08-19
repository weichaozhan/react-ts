export const SET_USER_MSG = 'SET_USER_MSG';

/**
 * @description 设置用户信息
 * @param {Object} userMsg
 */
export const setUserMsg = (userMsg: StoreReduxUser.IState) => {
  return {
    type: SET_USER_MSG,
    userMsg,
  };
};