import { Theme } from '@mui/material/styles';
import { MuiButton } from './MuiButton';
import { MuiSlider } from './MuiSlider';
import MuiDataGrid from './MuiDataGrid';
import MuiTooltip from './MuiToltip';
import { MuiAlert } from './MuiAlert';
import MuiPaper from './MuiPaper';

export const overrides = (theme: Theme) => ({
  ...MuiSlider(theme),
  ...MuiButton(theme),
  ...MuiDataGrid(),
  ...MuiTooltip(),
  ...MuiAlert(),
  ...MuiPaper(),
});
