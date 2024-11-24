import { ThemeOptions, createTheme } from '@mui/material';
import { palette } from './Palette';
import { overrides } from './overrides';
import { typography } from './Typography';
import { CustomTypography } from './CustomTypography';

const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      miniMobile: 0,
      xs: 390,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    ...typography,
    ...CustomTypography,
  },
  palette,
};

const theme = createTheme(themeOptions);
theme.components = overrides(theme);

export const customTheme = theme;
