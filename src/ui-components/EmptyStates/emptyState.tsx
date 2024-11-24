import { Box, Typography } from '@mui/material';
import './empityState.css';
import Image from 'next/image';
interface Props {
  title: string;
  description?: string;
}
function EmptyStates({ title, description }: Props) {
  return (
    <>
      <Box className="emptystate-container">
        <Image
          width={48}
          height={48}
          src="/images/EmptyStateImage/EmpyStateImage.svg"
          alt="Empty state image"
        />
        <Box mt={1.8}>
          <Typography className="emptystate-text">{title}</Typography>
          <Typography className="nft-netwok-text">{description}</Typography>
        </Box>
      </Box>
    </>
  );
}
export default EmptyStates;
