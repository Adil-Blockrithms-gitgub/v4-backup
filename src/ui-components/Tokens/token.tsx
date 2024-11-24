import { Box } from '@mui/material';
import './token.css';
import Image from 'next/image';
import { FC } from 'react';

interface TokenProps {
  variant: 'ECLIPSE' | 'AVAX' | 'USDCE' | 'USDC';
  width?: string | number;
}
const Token: FC<TokenProps> = ({ variant, width = 'auto' }) => {
  {
    switch (variant) {
      case 'ECLIPSE':
        return (
          <Box width={width}>
            <Image
              className="token"
              fill={true}
              src="/images/TokenImages/$eCLIPSE.svg"
              alt="ECLIPSE"
            />
          </Box>
        );
      case 'AVAX':
        return (
          <Box width={width}>
            <Image
              className="token"
              fill={true}
              src="/images/TokenImages/AVAX.svg"
              alt="AVAX"
            />
          </Box>
        );
      case 'USDCE':
        return (
          <Box width={width}>
            <Image
              className="token"
              fill={true}
              src="/images/TokenImages/TokenUSDC.svg"
              alt="USDCE"
            />
          </Box>
        );
      case 'USDC':
        return (
          <Box width={width}>
            <Image
              className="token"
              fill={true}
              src="/images/TokenImages/TokenUSDC.svg"
              alt="USDCE"
            />
          </Box>
        );
      default:
        return <></>;
    }
  }
};
export default Token;
