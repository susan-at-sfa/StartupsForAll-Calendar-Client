import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';

const initialState: NewEvent = emptyEvent;

const eventbriteSlice = createSlice({
  name: 'eventbrite',
  initialState,
  reducers: {
    requestEventbriteEvent(state, action: PayloadAction<{id: string}>) {},
    setEventbrite(state, action: PayloadAction<NewEvent>) {
      let eventData = action.payload;
      if (action.payload.start_time) {
        eventData.start = eventData.start_date;
      }
      if (Object.keys(action.payload.start).length > 0) {
        eventData.start = eventData.start.utc;
      }
      if (action.payload.end_time) {
        eventData.end = eventData.end_date;
      }
      if (Object.keys(action.payload.end).length > 0) {
        eventData.end = eventData.end.utc;
      }
      console.log("eventbriteSlice - setEventbrite reducer - eventData:", eventData);
      return { ...eventData };
    },
    resetEventBrite(state, action: PayloadAction<NewEvent>) {
      console.log("eventbrite slice - reset eb event - action.payload", action.payload);
      let eventData = action.payload;
      return { ...eventData };
    }
  }
});

export const { requestEventbriteEvent, setEventbrite, resetEventBrite } = eventbriteSlice.actions;

export default eventbriteSlice.reducer;
