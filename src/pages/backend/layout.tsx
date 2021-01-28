import React from 'react';
import {
  Toolbar,
  Avatar,
  Button,
  Container,
  AppBar,
  Typography,
  Box,
  Grid,
  Checkbox,
  makeStyles,
  createStyles,
  Hidden,
  Link,
  Divider,
  Paper,
} from '@material-ui/core';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../hooks/theme';
import { useAuth } from '../../hooks/auth';
import logoImage from '../../assets/logo-blue.png';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      marginRight: '15px',
      width: '50px',
      height: '50px',
    },
    link: {
      color: '#fafafa',
      display: 'flex',
      alignItems: 'center',
    },
    span: {
      color: '#ffda52',
      fontSize: '0.75rem',
    },
  }),
);

interface LayoutProps {
  title?: string;
  subTitle?: string;
  showTitleBar?: boolean;
}
const Layout: React.FC<LayoutProps> = ({
  title,
  subTitle,
  showTitleBar = false,
  children,
}) => {
  const { singOut, user } = useAuth();
  const { goBack } = useHistory();
  const { changeTheme, isDark } = useTheme();
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="sticky">
        <Toolbar variant="regular">
          <Container>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-around"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-around"
                  spacing={1}
                >
                  <Grid item>
                    <Avatar
                      alt={user.name}
                      src={user.avatar_url}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item>
                    <Typography component="span" className={classes.span}>
                      Seja bem vindo,
                    </Typography>
                    <Typography component="h2">
                      <Link
                        to={`/${user.slug}`}
                        target="_blank"
                        component={RouterLink}
                        className={classes.link}
                      >
                        {user.name}
                        <FiExternalLink
                          size={14}
                          style={{ marginLeft: '5px' }}
                        />
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden xsDown>
                <Grid item>
                  <Typography component="h1">
                    <Link
                      to="/dashboard"
                      component={RouterLink}
                      className={classes.link}
                    >
                      Painel Administrativo
                    </Link>
                  </Typography>
                </Grid>
              </Hidden>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-around"
                  spacing={1}
                >
                  <Grid item>
                    <Checkbox
                      checked={isDark}
                      onChange={changeTheme}
                      size="small"
                      icon={<FiMoon color="#fefefe" size={16} />}
                      checkedIcon={<FiSun size={16} />}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<FiLogOut size={14} />}
                      style={{ color: '#fefefe' }}
                      onClick={singOut}
                    >
                      Sair
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Container>
        {(showTitleBar || title) && (
          <Box mt={5}>
            <Paper>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Box ml={3}>
                    <Button onClick={goBack} variant="outlined">
                      Voltar
                    </Button>
                  </Box>
                </Grid>
                <Grid item />
                <Grid item />
                <Grid item />
                <Grid item>
                  <Box mr={3} textAlign="right">
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="h6" color="textSecondary">
                      {subTitle}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
        <Box mt={5} mb={5}>
          {children}
        </Box>
      </Container>
      <footer style={{ marginTop: 'auto', textAlign: 'center' }}>
        <Divider variant="middle" />
        <img
          src={logoImage}
          alt="Por Navegantes"
          width="120px"
          style={{ marginTop: '20px' }}
        />
        <Typography
          variant="subtitle2"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Mantenha sua campanha organizada e focada!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
};

export default Layout;
