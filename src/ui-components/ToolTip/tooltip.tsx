import { Box, Tooltip as MuiTooltip, Typography } from '@mui/material';
import { FC } from 'react';
import './tooltip.css';
interface ToolTipProps {
  text: string;
}

const ToolTip: FC<ToolTipProps> = ({ text }) => {
  return (
    <>
      <MuiTooltip
        title={
          <Box className="tooltip-main-container">
            <Typography className="tooltip-text">{text}</Typography>
          </Box>
        }
      >
        <button>Hover me</button>
      </MuiTooltip>
    </>
  );
};

export default ToolTip;
