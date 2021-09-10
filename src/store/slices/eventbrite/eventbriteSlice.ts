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
      console.log("eventbriteSlice - setEventbrite reduceer - action.payload:", action.payload);
      let eventData = action.payload;
      // eventData.start_date = eventData.start_date;
      // eventData.end_date = eventData.end_date;
      eventData.start_time = eventData.start_date;
      eventData.end_time = eventData.end_date;
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
