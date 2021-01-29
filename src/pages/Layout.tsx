import React from 'react';
import { Toolbar, AppBar, Typography, Grid } from '@material-ui/core';
import ReactGA from 'react-ga';

import { Link as RouterLink } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { useStyles } from './styles';

// import Footer from '../components/Footer';

const Layout: React.FC = ({ children }) => {
  ReactGA.initialize('UA-179213137-1');
  ReactGA.pageview(window.location.pathname + window.location.search);

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar position="sticky">
        <Toolbar variant="dense" className={classes.topBar}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item style={{ marginRight: '75px' }}>
              <Typography>
                <RouterLink to="/" className={classes.yellow}>
                  Hello! Be Welcome.
                </RouterLink>
              </Typography>
            </Grid>
            <Grid item>
              <RouterLink to="/dashboard" className={classes.link}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-around"
                  spacing={1}
                >
                  <Grid item>
                    <FiLock size={12} />
                  </Grid>
                </Grid>
              </RouterLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Layout;
