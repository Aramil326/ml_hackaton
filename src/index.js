import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#FEFEFE',
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
    document.getElementById('root')
);