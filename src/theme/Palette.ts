import { PaletteMode } from '@mui/material';

const storm = {
  100: '#0C0C0C',
  90: '#1A1A1A',
  80: '#333333',
  70: '#4C4C4C',
  60: '#666666',
  50: '#808080',
  30: '#B3B3B3',
  15: '#D9D9D9',
  10: '#F5F6F3',
  6: '#F8F8F8',
  0: '#FFFFFF',
};
const ash = '#F8F8F8';
const fire = '#F3523F';
const white = '#FFFFFF';
const black = '#000000';

const textColors = {
  widgetHeadingcolor: '#7c7c7c',
};

export const palette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: '#E8EC54',
    contrastText: storm[100],
  },
  secondary: {
    main: white,
    contrastText: black,
  },
  error: {
    main: '#DD1C77',
  },
  warning: {
    main: '#FAA73F',
  },
  info: {
    main: '#3E7DBC',
  },
  success: {
    main: '#47BA76',
  },
  background: {
    paper: storm[90],
    default: black,
  },
  text: {
    primary: white,
    secondary: storm[50],
  },
  storm,
  textColors,
  ash,
  fire,
};
