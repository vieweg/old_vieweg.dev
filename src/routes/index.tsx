import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RoutesFrontend from './frontend';
import RoutesDashboard from './dashboard';

import NoMatch from '../pages/404';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/page/404" exact component={NoMatch} />
      <Route path="/dashboard/" component={RoutesDashboard} />
      <Route path="/" component={RoutesFrontend} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Routes;
