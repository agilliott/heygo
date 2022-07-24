import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        groupLabel: {
          backgroundColor: '#2a2a2a',
        },
      },
    },
  },
});
