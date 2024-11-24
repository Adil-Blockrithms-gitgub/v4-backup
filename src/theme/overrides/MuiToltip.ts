import { palette } from '../Palette';

const MuiTooltip = () => ({
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        maxWidth: '195px',
        padding: '8px',
        backgroundColor: palette.storm[100],
        color: palette.ash,
        fontSize: '12px',
        fontWeight: 300,
        lineHeight: 'normal',
      },
    },
  },
});

export default MuiTooltip;
