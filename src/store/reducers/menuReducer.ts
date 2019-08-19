import {
  CHANGE_COLLAPSE,
  SET_SELECTED_MENU,
  SET_AUTH_MENU,
} from '../actions/menuAction';
import NAV_LIST from '../../constant/navList';

const initialState: StoreReduxMenu.IState = {
  collapsed: localStorage.getItem('collapse') === 'true' ? true : false, // 是否收起菜单
  menuList: [], // 权限菜单
  menuSelected: '', // 选中的菜单
};

const menuReduser = (state: StoreReduxMenu.IState = initialState, action: StoreReduxMenu.IAction) => {
  switch (action.type) {
    case CHANGE_COLLAPSE:
      localStorage.setItem('collapse', action.collapsChange);
      return {
        ...state,
        collapsed: action.collapsChange,
      };

    case SET_AUTH_MENU:
      return {
        ...state,
        menuList: action.menuList,
      };

    case SET_SELECTED_MENU: {
      let menuSelected: IMenuItem | string = '';
      const buildList = (list: Array<IMenuItem>) => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];

          if (item.children && (item.children as Array<IMenuItem>).length > 0) {
            buildList(item.children as Array<IMenuItem>);
          } else {
            if (item.navId === action.menuSelected) {
              menuSelected = item;
              break;
            }
          }
        }
      };
      if (Object.prototype.toString.call(action.menuSelected) === '[object Object]') {
        menuSelected = action.menuSelected;
      } else {
        buildList(NAV_LIST);
      }

      return {
        ...state,
        menuSelected,
      };
    }

    default:
      return state;
  }
};

export default menuReduser;