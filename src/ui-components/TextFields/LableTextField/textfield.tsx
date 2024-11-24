'use client';
import { ContentPaste } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import './textfield.css';
import { FC } from 'react';

type LableTextFieldProps = TextFieldProps & {
  InputWidth?: string;
};

const LableTextField: FC<LableTextFieldProps> = ({ InputWidth, ...rest }) => {
  return (
    <TextField
      {...rest}
      className="custom-input"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ContentPaste />
          </InputAdornment>
        ),
        style: {
          width: InputWidth,
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default LableTextField;
