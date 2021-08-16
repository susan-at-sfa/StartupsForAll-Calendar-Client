import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  token: '',
  status: 'idle',
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {},
    register(state, action: PayloadAction<{ username: string; password: string; email: string }>) {},
    setToken(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;
      return { ...state, token };
    },
  },
});

export const { login, register, setToken } = userSlice.actions;

export default userSlice.reducer;
