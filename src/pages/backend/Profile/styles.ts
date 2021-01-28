import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttomRemove: {
      width: '35px',
      height: '35px',
      position: 'absolute',
      bottom: '7px',
      right: '7px',
    },
    buttomChangeImage: {
      position: 'absolute',
      bottom: '7px',
      left: '7px',
      width: '35px',
      height: '35px',
      padding: '9px',
    },
  }),
);
