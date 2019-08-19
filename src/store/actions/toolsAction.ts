export const CHANGE_LOADING = 'CHANGE_LOADING';
export const SET_AUTH_MENU = 'SET_AUTH_MENU';
export const SET_SELECTED_MENU = 'SET_SELECTED_MENU';

/**
 * @description 全局 loading
 * @param {Boolean} loading true 显示
 */
export const changeLoading = (loading: boolean) => {
  return {
    type: CHANGE_LOADING,
    loading,
  };
};
