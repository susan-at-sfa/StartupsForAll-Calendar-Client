import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NewEvent from './NewEvent';

const initialState: NewEvent = {
  logo: '',
  changed: '',
  created: '',
  creator_name: '',
  creator_email: '',
  id: '',
  location: '',
  title: '',
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
    setEventbrite(state, action: PayloadAction<NewEvent>) {
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
