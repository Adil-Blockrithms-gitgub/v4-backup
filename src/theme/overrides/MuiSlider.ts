import { Theme } from '@mui/material/styles';

export const MuiSlider = (theme: Theme) => {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-rail': {
            borderRadius: 10,
          },
          '& .MuiSlider-thumb': {
            borderRadius: 10,
            width: '6px',
            height: '16px',
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '4px',
            color: 'black',
          },
        },
        valueLabel: {
          borderRadius: 3,
          color: 'black',
        },
      },
    },
  };
};
