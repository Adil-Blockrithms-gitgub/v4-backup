import { createSlice } from '@reduxjs/toolkit';

interface RefetchState {
  refetchNFTDetail: number;
}

export const getNFTDetailRefetch = (state: { refetch: RefetchState }) =>
  state.refetch.refetchNFTDetail;

const initialState: RefetchState = {
  refetchNFTDetail: 0,
};

const refetchSlice = createSlice({
  name: 'refetch',
  initialState,
  reducers: {
    setNFTDetailRefetch: (state) => {
      state.refetchNFTDetail = state.refetchNFTDetail + 1;
    },
  },
});

export const { setNFTDetailRefetch } = refetchSlice.actions;

export default refetchSlice.reducer;
