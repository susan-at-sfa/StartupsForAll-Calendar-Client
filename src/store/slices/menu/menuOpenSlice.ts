import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState { menuOpen: true | false }

const initialState: MenuState = { menuOpen: false };

const menuOpenSlice = createSlice({
  name: 'menuOpen',
  initialState,
  reducers: {
    setMenuOpen(state, action: PayloadAction<boolean>) {
      const menuOpen = action.payload;
      return { ...state, menuOpen }
    },
  }
})

export const { setMenuOpen } = menuOpenSlice.actions;

export default menuOpenSlice.reducer;