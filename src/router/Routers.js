import React from 'react';
import { ConfigProvider } from 'antd';
import { Switch, Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ROUTER_CONFIG } from './config';
import Layout from '@/model/layout/Layout';

function getRoute({
  path,
  title,
  component: Component,
}) {
  return (
    <Route
      exact
      key={JSON.stringify(path)}
      path={path}
      render={withRouter((props) => {
        console.log(props, 'withRouter');
        return (
          <Layout>
            <Component title={title} />
          </Layout>
        );
      })}
    />
  );
}

function getRoutes(config) {
  let {
    path, child,
  } = config;
  if (child && child.length > 0) {
    return child.map((elem) => getRoutes({
      ...elem,
      path: path + elem.path,
    }));
  }
  return getRoute(config);
}

export default function Routers() {
  return (
    <ConfigProvider locale={zhCN} prefixCls="s">
      <Router>
        <Switch>
          {
            ROUTER_CONFIG.map((elem) => getRoutes(elem))
          }
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
