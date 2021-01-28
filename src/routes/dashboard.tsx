import React from 'react';
import { Switch, RouteComponentProps } from 'react-router-dom';

import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalFrontend';
import { useTheme } from '../hooks/theme';
import Route from './Route';

import Admin from '../pages/backend/Dasboard';
import AdminProfile from '../pages/backend/Profile';
import AdminSection from '../pages/backend/Section';
import AdminLink from '../pages/backend/Link';
import AdminPost from '../pages/backend/Post';
import AdminSavePost from '../pages/backend/Post/Save';
import Register from '../pages/backend/Register';
import FormUser from '../pages/backend/Register/FormUser';

const RoutesDashboard: React.FC<RouteComponentProps> = ({ match }) => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <Switch>
          <Route exact path={match.url} component={Admin} isPrivate />
          <Route
            path={`${match.url}/profile`}
            component={AdminProfile}
            isPrivate
          />
          <Route
            path={`${match.url}/sections`}
            component={AdminSection}
            isPrivate
          />
          <Route path={`${match.url}/links`} component={AdminLink} isPrivate />
          <Route
            path={`${match.url}/posts/cadastro/:id?`}
            component={AdminSavePost}
            isPrivate
          />
          <Route path={`${match.url}/posts`} component={AdminPost} isPrivate />
          <Route
            path={`${match.url}/register/cadastro/:id?`}
            component={FormUser}
            isSuperAdmin
          />
          <Route
            path={`${match.url}/register`}
            component={Register}
            isSuperAdmin
          />
        </Switch>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default RoutesDashboard;
