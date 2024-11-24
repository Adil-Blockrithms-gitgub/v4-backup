import { Alert, Box, Snackbar, Typography } from '@mui/material';
import './toast.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getToastOptions,
  getToastState,
  hideToast,
} from '@/redux/features/toastSlice';

const Toast = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(getToastState);
  const options = useAppSelector(getToastOptions);

  const handleClose = () => {
    dispatch(hideToast());
  };
  {
    return (
      <Snackbar
        open={open}
        autoHideDuration={options.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          icon={false}
          severity={options.severity}
          className="alert-box"
        >
          <Box className="main-box-container">
            <Box className="main-box">
              <Typography className="header-snakbar">
                {options.message}
              </Typography>
              {options.description && (
                <Typography className="discription-snakbar">
                  {options.description}
                </Typography>
              )}

              {options.severity === 'success' && (
                <a
                  href={options.link}
                  target="_blank"
                  className="link"
                  rel="noopener noreferrer"
                >
                  Open on BlockExplorer
                </a>
              )}
            </Box>
            {/* <Box>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <KeyboardArrowRight sx={{ fontSize: 35 }} />
              </IconButton>
            </Box> */}
          </Box>
        </Alert>
      </Snackbar>
    );
  }
};

export default Toast;
