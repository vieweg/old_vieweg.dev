import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import SEO from '../../components/SEO';

import contatoImg from '../../assets/Interview-bro.png';
import Layout from '../Layout';

const Contato: React.FC = () => {
  return (
    <Layout>
      <SEO title="Fale conosco" description="Fale conosco." />
      <Container>
        <Box mt={8} textAlign="center">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
              <h2>Fale conosco</h2>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box py={5}>
                Para entrar em contato conosco, por favor adicione nosso
                whatsapp 47 9 9993 2802,
                <br />
                <a
                  href="https://wa.me/5547999932802"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  ou CLIQUE AQUI
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={contatoImg} alt="" width="350" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Contato;
