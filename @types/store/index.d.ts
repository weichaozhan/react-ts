declare namespace StoreReduxUser {
  import { AnyAction } from "redux";
  
  interface IAction extends AnyAction {
    type?: string;
    [propName: string]: any;
  }

  interface IState {
    username?: string;
    employeeId?: string|number;
    email?: string;
    deptName?: string;
    business?: string;
    chsName?: string;
    auth?: Array<string>;
    [propsName: string]: any;
  }
}

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

declare namespace StoreReduxTools {
  import { AnyAction } from "redux";
  
  interface IAction extends AnyAction {
    type?: string;
    [propName: string]: any;
  }

  interface IState {
    loading?: boolean; // 是否 loading
  }
}

