import { createTheme } from "@mui/material";
import '../assets/fonts/SFUIDisplay.woff'


export const theme = createTheme({
    palette: {
        primary: {
            main: '#e17afe',
        },
    },
    typography: {
      fontFamily: [
        'SF UI Display',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }
  });