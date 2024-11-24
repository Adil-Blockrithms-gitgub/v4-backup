import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { palette } from '@/theme/Palette';

const DiscoverGames: FC = () => {
  return (
    <Box
      sx={{
        p: '20px',
        height: '100%',
        backgroundColor: palette.storm[90],
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <Typography variant="p-xlg-bold" color={'text.secondary'}>
        Discover Games
      </Typography>
      <Stack
        direction={'row'}
        gap={1}
        sx={{
          mt: '15px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: { sm: 'row', xs: 'column' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '60%' }, // Adjust width for responsiveness
            height: 'auto',
          }}
        >
          <Image
            src="/images/DiscoverGames/Layer_5.png"
            alt="Empty state image"
            width={500} // Set actual width
            height={200} // Set actual height
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }} // Responsive styling
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, width: { sm: '38%', xs: '100%' } }}>
          <Box
            sx={{
              width: { sm: '49%', miniMobile: '90%' },
              height: 'auto',
            }}
          >
            <Image
              src="/images/DiscoverGames/Layer_4.png"
              alt="Empty state image"
              width={150} // Set actual width
              height={100} // Set actual height
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }} // Responsive styling
            />
          </Box>
          <Box
            sx={{
              width: { miniMobile: '90%', sm: '49%' },
              height: 'auto',
            }}
          >
            <Image
              src="/images/DiscoverGames/Layer_3.png"
              alt="Empty state image"
              width={150} // Set actual width
              height={100} // Set actual height
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }} // Responsive styling
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DiscoverGames;
