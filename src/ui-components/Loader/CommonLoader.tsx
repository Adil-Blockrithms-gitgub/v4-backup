import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const root = {
  display: 'flex',
  flexDirection: 'column',
  width: '90vw',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  //   background: 'rgba(255, 255, 255)',
  backdropFilter: 'blur(50px)',
};

export default function CommonLoader(props: {
  //   [x: string]: any;
  width?: string;
  height?: string;
  mb?: string;
  size?: string;
  text?: string;
}) {
  const { width, height, size, text, mb, ...rest } = props;

  if (width) root.width = width;

  return (
    <Box sx={root} style={{ height: height ?? 'auto', width: width ?? '90vw' }}>
      <Typography variant="h4" mb={mb ?? 2}>
        {text}
      </Typography>
      <CircularProgress size={size} {...rest} />
    </Box>
  );
}
