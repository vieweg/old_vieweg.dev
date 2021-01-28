import React from 'react';
import {
  Route as RouteReactRouter,
  RouteProps as RoutePropsReactRouter,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RoutePropsReactRouter {
  component: React.ComponentType;
  isPrivate?: boolean;
  isSuperAdmin?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isSuperAdmin = false,
  component: Component,
  render,
  ...props
}) => {
  const { user } = useAuth();
  if (isPrivate && !user) {
    return (
      <RouteReactRouter
        {...props}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/singin',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  if (isSuperAdmin && (!user || user.role !== 'admin')) {
    return (
      <RouteReactRouter
        {...props}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  if (!isSuperAdmin && user && user.role === 'admin') {
    return (
      <RouteReactRouter
        {...props}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/dashboard/register',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return (
    <RouteReactRouter {...props} render={({ location }) => <Component />} />
  );
};

export default Route;
