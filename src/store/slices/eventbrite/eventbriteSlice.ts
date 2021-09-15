import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';
import { toLocalTime } from '../../../hooks';

const initialState: NewEvent = emptyEvent;

const eventbriteSlice = createSlice({
  name: 'eventbrite',
  initialState,
  reducers: {
    requestEventbriteEvent(state, action: PayloadAction<{id: string}>) {},
    setEventbrite(state, action: PayloadAction<NewEvent>) {
      let eventData = action.payload;
      // eventData.start_date = eventData.start_date;
      // eventData.end_date = eventData.end_date;
      if (action.payload.start_time) {
        eventData.start_time = eventData.start_date;
      }
      if (Object.keys(action.payload.start).length > 0) {
        eventData.start_time = eventData.start.utc;
      }
      if (action.payload.end_time) {
        eventData.end_time = eventData.end_date;
      }
      if (Object.keys(action.payload.end).length > 0) {
        eventData.end_time = eventData.end.utc;
      }
      console.log("eventbriteSlice - setEventbrite reduceer - eventData:", eventData);
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
