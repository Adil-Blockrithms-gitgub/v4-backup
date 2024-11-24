'use client';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import './textfield.css';
import { FC } from 'react';
import Image from 'next/image';

type WithOutLableTextFieldProps = TextFieldProps & {
  InputWidth?: string;
  endText?: string | React.ReactElement;
  startText?: string;
  maxAmount?: number;
  setMaxAmount?: (value: number) => void;
};

const WithOutLableTextField: FC<WithOutLableTextFieldProps> = ({
  InputWidth,
  endText = 'MAX',
  startText,
  maxAmount,
  setMaxAmount,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      className="custom-input"
      style={{ width: InputWidth }}
      InputProps={{
        startAdornment: startText ? (
          <InputAdornment position="start">
            {typeof startText === 'string' ? (
              <Image width={24} height={24} src={startText} alt="image" />
            ) : (
              startText
            )}
          </InputAdornment>
        ) : undefined,
        endAdornment: endText ? (
          <InputAdornment position="end" className="">
            {typeof endText === 'string' ? (
              <span
                className="pt-2 align-baseline text-yellow-300 rounded-lg p-1 cursor-pointer hover:bg-gray-700"
                onClick={() =>
                  setMaxAmount ? setMaxAmount(maxAmount ? maxAmount : 0) : null
                }
              >
                {endText}
              </span>
            ) : (
              endText
            )}
          </InputAdornment>
        ) : undefined,
        style: {
          height: 45,
          width: InputWidth,
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
export default WithOutLableTextField;
