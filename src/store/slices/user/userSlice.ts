import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  username: string;
  status: 'idle' | 'loading' | 'failed';
  email: string;
  id: string;
  created_at: string;
  updated_at: string;
}

const initialState: UserState = {
  username: 'User',
  status: 'idle',
  email: '',
  id: '',
  created_at: '',
  updated_at: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state) {
      return state;
    },
    setUser(state, action) {
      const userData = action.payload;
      return { ...state, ...userData };
    },
  },
});

export const { getUser, setUser } = userSlice.actions;

export default userSlice.reducer;
