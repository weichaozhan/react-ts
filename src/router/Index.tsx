
/**
 * 路由入口
 */
import React, { lazy, } from 'react';
import { connect, } from 'react-redux';
import { RouteProps } from 'react-router';
import { Switch, Route, Redirect, } from 'react-router-dom';

import routes from './routes';
import suspenseComponent from '../tools/suspenseComponent';
import {
  ROOT_ROUTE_REDIRECT,
} from '../constant/global';
import NAV_LIST from '../constant/navList';

import * as menuAction from '../store/actions/menuAction';

const NoMatch = lazy(() => import('../components/NoMatch'));

interface IState {
  routes: Array<RouteProps>;
}

/**
 * @description 构建权限路由
 * @param {StoreReduxUser.IState} userMsg 用户信息，包含权限
 */
function buildAuth(userMsg: StoreReduxUser.IState) {
  const authRoute: Array<RouteProps> = [];
  routes.forEach((route: RouteProps) => {
    let authHas = false;
    
    if (userMsg.auth) {
      authHas = userMsg.auth.some(path => {
        if (path === '/') {
          return route.path === '/';
        } else {
          return new RegExp((`^${path}`)).test(route.path as string);
        }
      });
    }

    if (authHas) {
      authRoute.push(route);
    }
  });
  
  return authRoute;
}

class Router extends React.Component<any, IState> {
  public static getDerivedStateFromProps(nextProps: any, nextState: any) {
    return { ...nextState, routes: buildAuth(nextProps.user.userMsg) };
  }

  public constructor(props: any) {
    super(props);

    this.state = {
      routes: [],
    };
  }

  public async componentDidUpdate(preProps: any, preState: IState) {
    if (JSON.stringify(preState.routes) !== JSON.stringify(this.state.routes)) {
      this.buildMenu(this.props.user.userMsg.auth);
    }
  }

  public buildMenu(auth: [string]) {
    const buildMenu = (menuList: Array<IMenuItem>) => {
      let r: IMenuItem[] = [];

      menuList.forEach(menu => {
        const menuChildren = menu.children as Array<IMenuItem>;
        
        if (menuChildren && menuChildren.length > 0) {
          const child = buildMenu(menuChildren);
          const newMenu = { ...menu, children: child, };
          
          if (child.length > 0) {
            r.push(newMenu);
          }
        } else {
          if (auth.indexOf(menu.link as string) > -1) {
            r.push(menu);
          }
        }
      });
      return r;
    };
    
    this.props.setAuthMenu(buildMenu(NAV_LIST));
  }

  public render() {
    return <Switch>
      {this.state.routes.map((item, index) => (<Route {...item} key={index} />))}
      <Redirect exact path="/" to={{ pathname: ROOT_ROUTE_REDIRECT, }} />
      <Route component={suspenseComponent(NoMatch)} />
    </Switch>;
  }
}

/**
 * @description action 作为 props 绑定
 * @param {Function} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: Function,) => {
  return {
    setAuthMenu: (menuList: Array<IMenuItem>) => dispatch(menuAction.setAuthMenu(menuList)),
  };
};

/**
 * @description 绑定 store 到props
 * @param {Object} state store
 */
const mapStateToProps = (state: any,) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);