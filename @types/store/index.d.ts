declare namespace StoreReduxTest {
  import { AnyAction } from "redux";
  
  interface IAction extends AnyAction {
    type?: string,
    text?: string,
  }

  interface IState {
    data: string;
    subData?: string;
  }
}

declare namespace StoreReduxMenu {
  import { AnyAction } from "redux";
  
  interface IAction extends AnyAction {
    type?: string;
    [propName: string]: any;
  }

  interface IState {
    collapsed?: boolean; // 是否收起菜单
    menuList: Array<IMenuItem>; // 权限菜单
    menuSelected?: IMenuItem | string; // 选中的菜单
  }
}
