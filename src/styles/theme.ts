import { ThemeOptions } from '@material-ui/core/styles';

export const theme = {
  palette: {
    primary: {
      main: '#2c2e36',
    },
    secondary: {
      main: '#4A90E2',
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: '#cacaca',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#4A90E2',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
        '&$focused $notchedOutline': {
          borderColor: '#4A90E2',
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#4A90E2',
        },
      },
    },
  },
} as ThemeOptions;
