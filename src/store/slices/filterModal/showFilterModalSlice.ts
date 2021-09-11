import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterModalState {
  filterModalOpen: true | false;
}

const initialState: FilterModalState = {
  filterModalOpen: false
};

const showFilterModalSlice = createSlice({
  name: 'filterModal',
  initialState,
  reducers: {
    setFilterModalOpen(state, action: PayloadAction<boolean>) {
      const filterModalOpen = action.payload;
      return { ...state, filterModalOpen }
    },
  }
})

export const { setFilterModalOpen } = showFilterModalSlice.actions;

export default showFilterModalSlice.reducer;