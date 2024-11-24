import { Address } from 'viem';
import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
  isConnected: boolean;
  address: Address | undefined;
}

export const getUserAddress = (state: { userData: AccountState }) =>
  state.userData?.address;
export const getIsConnected = (state: { userData: AccountState }) =>
  state.userData?.isConnected;

const initialState: AccountState = {
  isConnected: false,
  address: undefined,
};

const accountSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setConnected, setAddress } = accountSlice.actions;

export default accountSlice.reducer;
