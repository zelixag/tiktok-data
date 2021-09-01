import { Spin } from "antd";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
const LoginPage = lazy(() => import('./pages/login'));
const Application = lazy(() => import('./pages/application'));
export default function App() {
  return (
    <Router >
      <Suspense fallback={<Spin style={{ width: '100vw', height: '100%' }} size="large" />}>
        <Switch>
          <Route exact path="/" component={LoginPage}>
          </Route>
          <Route path="/app" component={Application}>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}