import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const ToastSeverity = {
  INFO: 'info' as AlertColor,
  SUCCESS: 'success' as AlertColor,
  ERROR: 'error' as AlertColor,
  WARNING: 'warning' as AlertColor,
};

export interface ToastOptions {
  severity?: AlertColor;
  link?: string;
  message?: string;
  description?: string;
  autoHideDuration?: number;
  variant?: string;
  anchorOrigin?: object;
}

export interface ToastState {
  state: boolean;
  options: ToastOptions;
}

export const getToastState = (state: { toast: ToastState }) =>
  state.toast?.state;
export const getToastOptions = (state: { toast: ToastState }) =>
  state.toast?.options;

const initialState: ToastState = {
  state: false,
  options: {
    severity: ToastSeverity.INFO,
    link: '',
    message: 'Hi',
    description: '',
    autoHideDuration: 5000,
    variant: 'filled',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  },
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state: ToastState, action: PayloadAction<ToastOptions>) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideToast: (state: ToastState) => {
      state.state = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
