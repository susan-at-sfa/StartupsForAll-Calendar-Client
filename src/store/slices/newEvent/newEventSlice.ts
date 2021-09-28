import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';

const initialState: NewEvent = emptyEvent;

const newEventSlice = createSlice({
  name: 'newEvent',
  initialState,
  reducers: {
    resetEvent(state, action: PayloadAction<NewEvent>) {
      let eventData = action.payload;
      return { ...eventData };
    },
    saveNewEvent(state, action: PayloadAction<{form: NewEvent, token: string }>) {},
    updateExistingEvent(state, action: PayloadAction<{form: NewEvent, token: string, id: string}>) {},
    deleteEvent(state, action: PayloadAction<{token: string, id: string}>) {},
  }
});

export const { deleteEvent, saveNewEvent, resetEvent, updateExistingEvent } = newEventSlice.actions;

export default newEventSlice.reducer;
