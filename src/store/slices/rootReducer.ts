import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './user/userSlice';
import authReducer, { AuthState } from './auth/authSlice';
import { Reducer } from 'react';

type RootReducer = Reducer<CombinedState<{
  auth: AuthState;
  user: UserState;
}>, AnyAction>;

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<RootReducer>;
