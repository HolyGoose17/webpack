import { createTheme } from '@mui/material';
import { blue, green, orange, purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[200],
      light: green[200],
      dark: blue[700],
    },
    secondary: {
      main: orange[300],
    },
    success: {
      main: green[100],
    },
  },
  typography: {
    fontFamily: 'ui-monospace',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 'unset',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});
