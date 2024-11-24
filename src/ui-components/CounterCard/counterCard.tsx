import { FC } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { palette } from '@/theme/Palette';

interface Props {
  title: string;
  handleButtonClick?: () => void;
  count: number;
  detail?: string;
  date?: string;
  width?: number | string;
  buttonText?: string;
  isLoading: boolean;
}
const CounterCard: FC<Props> = ({
  title = 'title',
  handleButtonClick,
  count = 0,
  detail,
  date,
  width,
  buttonText,
  isLoading = false,
}) => {
  return (
    <Box
      sx={{
        p: '20px',
        minWidth: '240px',
        width: width,
        backgroundColor: palette.storm[90],
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="p-xlg-bold"
          sx={{ color: palette.textColors.widgetHeadingcolor }}
        >
          {title}
        </Typography>
        {handleButtonClick && (
          <Button
            onClick={handleButtonClick}
            sx={{
              'color': 'white',
              'borderRadius': 0,
              ':hover': {
                color: 'white',
              },
            }}
          >
            {buttonText ?? 'Text'}
          </Button>
        )}
      </Box>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '190px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ my: 6, mx: 'auto', width: 'fit-content' }}>
            <Typography component={'p'} variant="h1" textAlign={'center'}>
              {count}
            </Typography>
          </Box>
          {detail && (
            <Typography
              textAlign={'center'}
              mt={1.5}
              sx={{ color: palette.storm[60] }}
            >
              {detail} {date}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CounterCard;
