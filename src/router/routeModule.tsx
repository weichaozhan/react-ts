/**
 * 路由模板封装
 */
import React, { lazy, } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';

import suspenseComponent from '../tools/suspenseComponent';
import {
  ROOT_ROUTE_REDIRECT,
} from '../constant/global';

const NoMatch = lazy(() => import('../components/NoMatch'));

class Router extends React.Component<CustomizeRouter.IRouteModuleProps, any> {
  public static propTypes = {
  };

  public constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Switch>
        {this.props.routes.map((item, index) => (<Route {...item} key={index} />))}
        <Redirect exact path="/" to={{ pathname: ROOT_ROUTE_REDIRECT, }} />
        <Route component={suspenseComponent(NoMatch)} />
      </Switch>
    );
  }
}

export default Router;