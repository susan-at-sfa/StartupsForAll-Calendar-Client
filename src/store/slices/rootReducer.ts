import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from './user/userSlice';
import authReducer, { AuthState } from './auth/authSlice';
import menuOpenReducer, { MenuState } from './menu/menuOpenSlice';
import newEventReducer from './newEvent/newEventSlice';
import eventbriteReducer from './eventbrite/eventbriteSlice';
import NewEvent from '../../constants/NewEvent.d';
import { Reducer } from 'react';
import eventModalReducer, { EventDetailsModalState } from './eventDetails/showEventDetailsSlice';

type RootReducer = Reducer<CombinedState<{
  auth: AuthState;
  eventbrite: NewEvent;
  eventModal: EventDetailsModalState;
  menu: MenuState;
  newEvent: NewEvent;
  user: UserState;
}>, AnyAction>;

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    eventbrite: eventbriteReducer,
    eventModal: eventModalReducer,
    menu: menuOpenReducer,
    newEvent: newEventReducer,
    user: userReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<RootReducer>;
