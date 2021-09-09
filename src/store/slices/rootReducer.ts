import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './user/userSlice';
import authReducer, { AuthState } from './auth/authSlice';
import menuOpenReducer, { MenuState } from './menu/menuOpenSlice';
import newEventReducer from './eventbrite/newEventSlice';
import NewEvent from './eventbrite/NewEvent';
import { Reducer } from 'react';
import eventModalReducer, { EventDetailsModalState } from './eventDetails/showEventDetailsSlice';

type RootReducer = Reducer<CombinedState<{
  auth: AuthState;
  user: UserState;
  menu: MenuState;
  newEvent: NewEvent;
  eventModal: EventDetailsModalState;
}>, AnyAction>;

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    menu: menuOpenReducer,
    newEvent: newEventReducer,
    eventModal: eventModalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<RootReducer>;
