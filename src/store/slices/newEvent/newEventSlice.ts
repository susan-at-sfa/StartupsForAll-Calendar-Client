import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';
import { toast } from 'react-toastify';

const initialState: NewEvent = emptyEvent;

const newEventSlice = createSlice({
  name: 'newEvent',
  initialState,
  reducers: {
    resetEvent(state, action: PayloadAction<NewEvent>) {
      let eventData = action.payload;
      toast("Event creation cancelled.");
      return { ...eventData };
    },
    saveNewEvent(state, action: PayloadAction<{form: NewEvent, token: string}>) {}
  }
});

export const { saveNewEvent, resetEvent } = newEventSlice.actions;

export default newEventSlice.reducer;
