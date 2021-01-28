import React from 'react';
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Copyright from '../Copyright';
import logoImageBlue from '../../assets/logo-blue.png';

const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: 'auto', textAlign: 'center' }}>
      <Divider variant="middle" />
      <Container>
        <Grid
          direction="row"
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="column"
            justify="flex-start"
          >
            <Grid item>
              <Link to="/">
                <img
                  src={logoImageBlue}
                  alt="Por Navegantes"
                  width="120px"
                  style={{ marginTop: '10px' }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                Candidatos por Navegantes
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box m={2} textAlign="center">
              <Typography
                component="p"
                variant="caption"
                color="textSecondary"
                gutterBottom
              >
                * As informações contidas neste site, são fornecidas e de
                responsabilidade de seus usuários.
              </Typography>
              <Typography
                component="p"
                color="textSecondary"
                variant="caption"
                gutterBottom
              >
                Duvidas, sugestões e/ou reclamações, fale com
                {`${' '}`}
                <Link to="/contato">Por Navegantes.</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
