import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './user/userSlice';
import authReducer, { AuthState } from './auth/authSlice';
import menuOpenReducer, { MenuState } from './menu/menuOpenSlice';
import eventbriteReducer, { EventbriteEvent } from './eventbrite/eventbriteSlice';
import { Reducer } from 'react';

type RootReducer = Reducer<CombinedState<{
  auth: AuthState;
  user: UserState;
  menu: MenuState;
  eventbrite: EventbriteEvent;
}>, AnyAction>;

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    menu: menuOpenReducer,
    eventbrite: eventbriteReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<RootReducer>;
