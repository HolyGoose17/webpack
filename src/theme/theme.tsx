import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: green,
    secondary: purple,
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
