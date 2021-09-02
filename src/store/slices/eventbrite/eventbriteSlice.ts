import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EventbriteEvent {
  name: string;
  created: Date | null;
  changed: Date | null;
  currency: string;
  description: string;
  summary: string;
  start: Record<string, unknown>;
  end: Record<string, unknown>;
  id: string;
  url: string;
 }

const initialState: EventbriteEvent = { 
  name: '',
  created: null,
  changed: null,
  currency: '',
  description: '',
  summary: '',
  start: {},
  end: {},
  id: '',
  url: '',
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