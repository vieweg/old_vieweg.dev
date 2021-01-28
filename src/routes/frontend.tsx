import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';
import GlobalStyle from '../styles/globalFrontend';

import SignIn from '../pages/SingIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Section from '../pages/Section';
import Single from '../pages/Single';

const RoutesFrontend: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Switch>
        <Route path={`${match.url}singin`} component={SignIn} />
        <Route
          path={`${match.url}forgot-password`}
          component={ForgotPassword}
        />
        <Route path={`${match.url}reset-password`} component={ResetPassword} />
        <Route path={`${match.url}p/:articleSlug`} component={Single} />
        <Route path={`${match.url}s/:sectionSlug`} component={Section} />
        <Route path={`${match.url}`} component={Profile} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default RoutesFrontend;
