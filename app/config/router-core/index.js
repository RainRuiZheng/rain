/*
 * @Author: your name
 * @Date: 2019-04-21 05:46:54
 * @LastEditTime: 2021-04-22 17:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /order-manage/Users/zhengrui/Desktop/hz/react-redux-cli/app/config/router-core/index.js
 */
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ScrollToTop from './scrollToTop';
import routes, { App } from '../route';

const AppWithRouter = withRouter(App);
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.path === '/'}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )} />
);

const RouteConfig = () => (
  <Router>
    <ScrollToTop>
      <AppWithRouter>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </AppWithRouter>
    </ScrollToTop>
  </Router>
);

export default RouteConfig;
