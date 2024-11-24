import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import './helpertext.css';

interface HelperTextProps {
  variant: 'error' | 'info' | 'success';
  text: string;
  fontSize?: string | number;
}

const HelperText: FC<HelperTextProps> = ({
  variant,
  text,
  fontSize = '12px',
}) => {
  {
    switch (variant) {
      case 'error':
        return (
          <>
            <Box className="text-container">
              <Image
                width={11.12}
                height={9.92}
                src="/images/HelperTextImages/error-helper-text.svg"
                alt="icon helper text"
              />
              <Typography sx={{ fontSize: fontSize }} className="error-text">
                {text}
              </Typography>
            </Box>
          </>
        );
      case 'info':
        return (
          <>
            <Box className="text-container">
              <Image
                width={11.12}
                height={9.92}
                src="/images/HelperTextImages/info-helper-text.svg"
                alt="icon helper text"
              />
              <Typography sx={{ fontSize: fontSize }} className="info-text">
                {text}
              </Typography>
            </Box>
          </>
        );
      case 'success':
        return (
          <>
            <Box className="text-container">
              <Image
                width={11.12}
                height={9.92}
                src="/images/HelperTextImages/succes-helper-text.svg"
                alt="icon helper text"
              />
              <Typography sx={{ fontSize: fontSize }} className="succes-text">
                {text}
              </Typography>
            </Box>
          </>
        );
    }
  }
};

export default HelperText;
