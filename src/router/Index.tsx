
/**
 * 路由入口
 */
import React from 'react';

import routes from './routes';
import RouteModule from './routeModule';

class Router extends React.Component {

  public render() {
    return <RouteModule routes={routes} />;
  }
}

export default Router;