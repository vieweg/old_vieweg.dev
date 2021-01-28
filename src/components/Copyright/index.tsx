import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { GoHeart } from 'react-icons/go';

const Copyright: React.FC = () => {
  return (
    <Typography
      component="div"
      variant="body2"
      color="textSecondary"
      gutterBottom
    >
      <Grid container justify="center" direction="row" alignItems="center">
        <Grid item>Feito com</Grid>
        <Grid item>
          <GoHeart color="#d2372b" style={{ margin: '4px 4px 0 4px' }} />
        </Grid>
        <Grid item>em Navega/SC</Grid>
      </Grid>
    </Typography>
  );
};

export default Copyright;
