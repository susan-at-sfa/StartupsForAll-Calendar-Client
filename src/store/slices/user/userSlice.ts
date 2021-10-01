import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  name?: string;
  username?: string;
  status: 'idle' | 'loading' | 'failed';
  isAdmin?: boolean;
  email?: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
}

const initialState: UserState = {
  name: '',
  username: '',
  status: 'idle',
  email: '',
  isAdmin: false,
  id: '',
  created_at: '',
  updated_at: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state) {
      console.log('userSlice getUser()', state);
      return state;
    },
    setUser(state, action) {
      console.log('setUser in userSlice', action);
      const userData = action.payload;
      return { ...state, ...userData };
    },
    resetUser(state) {
      return { ...state, ...initialState };
    },
  },
});

export const { getUser, setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
