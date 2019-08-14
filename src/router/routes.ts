/**
 * 入口路由数组
 */
import { lazy, } from 'react';

import suspenseComponent from '../tools/suspenseComponent';
import { RouteProps } from 'react-router';

const Test = lazy(() => import('../pages/test/Index')); // 测试

const routes: Array<RouteProps> = [
  {
    path: '/a',
    exact: true,
    component: suspenseComponent(Test),
  },
];

export default routes;