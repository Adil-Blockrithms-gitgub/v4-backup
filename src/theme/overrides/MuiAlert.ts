import { KeyboardArrowRight } from '@mui/icons-material';
import { palette } from '../Palette';

export const MuiAlert = () => {
  return {
    MuiAlert: {
      defaultProps: {
        components: {
          CloseIcon: KeyboardArrowRight,
        },
      },

      styleOverrides: {
        filledError: {
          backgroundColor: palette.fire,
        },
        filledSuccess: {
          backgroundColor: palette.success.main,
        },
        filledInfo: {
          backgroundColor: palette.success.main,
        },
      },
    },
  };
};
