import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';

const initialState: NewEvent = emptyEvent;

const newEventSlice = createSlice({
  name: 'newEvent',
  initialState,
  reducers: {
    requestEventbriteEvent(state, action: PayloadAction<{id: string}>) {},
    setEventbrite(state, action: PayloadAction<NewEvent>) {
      console.log("newEventSlice, action payload:", action.payload);
      let eventData = action.payload;
      // eventData.start_date = eventData.start_date;
      // eventData.end_date = eventData.end_date;
      eventData.start_time = eventData.start_date;
      eventData.end_time = eventData.end_date;
      return { ...eventData };
    },
    resetEvent(state, action: PayloadAction<NewEvent>) {
      let eventData = action.payload;
      return { ...eventData };
    }
  }
});

export const { requestEventbriteEvent, setEventbrite, resetEvent } = newEventSlice.actions;

export default newEventSlice.reducer;
