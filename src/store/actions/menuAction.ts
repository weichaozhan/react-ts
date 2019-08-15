export const CHANGE_COLLAPSE = 'CHANGE_COLLAPSE';
export const SET_AUTH_MENU = 'SET_AUTH_MENU';
export const SET_SELECTED_MENU = 'SET_SELECTED_MENU';

/**
 * @description 是否收起菜单
 * @param {Boolean} collapsChange true 收起
 */
export const changeCollaps = (collapsChange: boolean) => {
  return {
    type: CHANGE_COLLAPSE,
    collapsChange,
  };
};

/**
 * @description 设置权限菜单
 * @param {Array} menuList 权限菜单
 */
export const setAuthMenu = (menuList: Array<IMenuItem>) => {
  return {
    type: SET_AUTH_MENU,
    menuList,
  };
};

/**
 * @description 设置选中的菜单
 * @param {String|Object} menuSelected 被选中的菜单项
 */
export const setSelectedMenu = (menuSelected: IMenuItem | string) => {
  return {
    type: SET_SELECTED_MENU,
    menuSelected,
  };
};