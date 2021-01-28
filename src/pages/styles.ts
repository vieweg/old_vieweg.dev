import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    link: {
      color: '#fafafa',
      textDecoration: 'none',
      fontSize: '12px',
    },
    yellow: {
      color: '#ffda52',
    },
    topBar: {
      background: '#2c2e36',
    },
  }),
);
