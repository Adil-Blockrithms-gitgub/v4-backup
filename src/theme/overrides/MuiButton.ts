import { Theme } from '@mui/material/styles';
import { palette } from '../Palette';

export const MuiButton = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-sizeSmall': {
            height: '40px',
          },
          '&.MuiButton-sizeMedium': {
            height: '42px',
          },
          '&.MuiButton-sizeLarge': {
            height: '45px',
          },
          'padding': '10px',
          'textTransform': 'none' as const,
          'zIndex': 4,
        },
        outlined: {
          'color': theme.palette.common.white,
          'border': `1px solid  ${theme.palette.common.white} `,
          'borderRadius': '0px !important',
          'backgroundColor': `${palette.storm[90]} !important`,
          '&:hover': {
            border: `1px solid  ${theme.palette.common.white} `,
            color: theme.palette.common.white,
            backgroundColor: `${palette.storm[90]} !important`,
          },
        },
      },
    },
  };
};
