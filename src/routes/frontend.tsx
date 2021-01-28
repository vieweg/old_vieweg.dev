import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';
import GlobalStyle from '../styles/globalFrontend';
import Index from '../pages/Index';
import SignIn from '../pages/SingIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Section from '../pages/Section';
import Single from '../pages/Single';
import Contato from '../pages/Contato';

const RoutesFrontend: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.url} component={Index} />
        <Route path={`${match.url}singin`} component={SignIn} />
        <Route
          path={`${match.url}forgot-password`}
          component={ForgotPassword}
        />
        <Route path={`${match.url}reset-password`} component={ResetPassword} />
        <Route path={`${match.url}contato`} component={Contato} />

        <Route
          path={`${match.url}:profileSlug/contato`}
          render={() => <h1>Contato</h1>}
        />
        <Route
          path={`${match.url}:profileSlug/p/:articleSlug`}
          component={Single}
        />
        <Route
          path={`${match.url}:profileSlug/s/:sectionSlug`}
          component={Section}
        />
        <Route path={`${match.url}:profileSlug/`} component={Profile} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default RoutesFrontend;
