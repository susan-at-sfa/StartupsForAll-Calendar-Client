import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EventbriteEvent from './EventbriteEvent';

const initialState: EventbriteEvent = {
  form_elements: [],
  logo: '',
  series_dates: [],
};

const eventbriteSlice = createSlice({
  name: 'eventbrite',
  initialState,
  reducers: {
    requestEventbriteEvent(state, action: PayloadAction<{id: string}>) {},
    setEventbrite(state, action: PayloadAction<EventbriteEvent>) {
      const eventData = action.payload;
      return { ...eventData };
    },
  }
})

export const { requestEventbriteEvent, setEventbrite } = eventbriteSlice.actions;

export default eventbriteSlice.reducer;
