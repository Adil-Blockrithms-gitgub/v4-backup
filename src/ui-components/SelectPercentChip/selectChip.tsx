import React, { FC } from 'react';
import { clsx } from 'clsx';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import './selectChip.css';

interface Props {
  value: number;
  handleChange: (value: number) => void;
}

const SelectChip: FC<Props> = ({ value, handleChange }) => {
  return (
    <>
      <Box className="selectchip-container">
        <Box
          onClick={() => handleChange(0.1)}
          className={clsx('chip-box', { selected: value === 0.1 })}
        >
          <Typography className="text-box-chip">0.1%</Typography>
        </Box>
        <Box
          onClick={() => handleChange(0.5)}
          className={clsx('chip-box', { selected: value === 0.5 })}
        >
          <Typography className="text-box-chip">0.5%</Typography>
        </Box>
        <Box
          onClick={() => handleChange(1)}
          className={clsx('chip-box', { selected: value === 1 })}
        >
          <Typography className="text-box-chip">1%</Typography>
        </Box>
        <Box>
          <TextField
            variant="outlined"
            placeholder="0"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(Number(event.target.value))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: { min: 0, max: 999 },
            }}
            sx={{
              '.MuiInputBase-input': {
                pb: 2,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SelectChip;
