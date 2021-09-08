import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EventbriteEvent from './EventbriteEvent';

const initialState: EventbriteEvent = {
  logo: '',
  changed: '',
  created: '',
  id: '',
  name: '',
  cost: '',
  currency: '',
  summary: '',
  description: '',
  url: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  series_dates: [],
};

const eventbriteSlice = createSlice({
  name: 'eventbrite',
  initialState,
  reducers: {
    requestEventbriteEvent(state, action: PayloadAction<{id: string}>) {},
    setEventbrite(state, action: PayloadAction<EventbriteEvent>) {
      let eventData = action.payload;
      eventData.start_date = new Date(Date.parse(eventData.start_date));
      eventData.end_date = new Date(Date.parse(eventData.end_date));
      eventData.start_time = eventData.start_date;
      eventData.end_time = eventData.end_date;
      return { ...eventData };
    },
  }
})

export const { requestEventbriteEvent, setEventbrite } = eventbriteSlice.actions;

export default eventbriteSlice.reducer;
