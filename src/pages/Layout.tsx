import React from 'react';
import { Toolbar, AppBar, Typography, Grid, Hidden } from '@material-ui/core';
import ReactGA from 'react-ga';

import { Link as RouterLink } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { useStyles } from './styles';

import logoImage from '../assets/logo-white.png';
import Footer from '../components/Footer';

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
            <Grid item>
              <RouterLink to="/">
                <img
                  src={logoImage}
                  alt="Por Navegantes"
                  height={22}
                  style={{ marginTop: '4px' }}
                />
              </RouterLink>
            </Grid>
            <Hidden xsDown>
              <Grid item style={{ marginRight: '75px' }}>
                <Typography className={classes.yellow}>
                  Acompanhe seu candidato
                </Typography>
              </Grid>
            </Hidden>
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
                  <Grid item>Entrar</Grid>
                </Grid>
              </RouterLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
