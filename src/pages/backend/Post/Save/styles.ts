import {
  LinearProgress,
  withStyles,
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core';

export const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemGallery: {
      height: '130px',
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
    },
    itemGalleryImg: {
      left: '50%',
      height: '100%',
      position: 'relative',
      transform: 'translateX(-50%)',
    },
    buttomRemove: {
      width: '35px',
      height: '35px',
      position: 'absolute',
      bottom: '7px',
      right: '7px',
    },
    postImageBox: {
      height: '155px',
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
    },
    postImage: {
      left: '50%',
      width: '100%',
      position: 'relative',
      transform: 'translateX(-50%)',
    },
    buttomChangeImage: {
      position: 'absolute',
      bottom: '7px',
      left: '7px',
      width: '35px',
      height: '35px',
      padding: '9px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
