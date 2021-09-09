import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EventDetailsModalState {
  eventDetailsModalOpen: true | false;
  selectedEventID: string | undefined;
}

const initialState: EventDetailsModalState = {
  eventDetailsModalOpen: false,
  selectedEventID: ""
};

const showEventDetailsSlice = createSlice({
  name: 'eventModal',
  initialState,
  reducers: {
    setSelectedEventID(state, action: PayloadAction<string>) {
      const selectedEventID = action.payload;
      return { ...state, selectedEventID }
    },
    setEventDetailsModalOpen(state, action: PayloadAction<boolean>) {
      const eventDetailsModalOpen = action.payload;
      return { ...state, eventDetailsModalOpen }
    },
  }
})

export const { setEventDetailsModalOpen, setSelectedEventID } = showEventDetailsSlice.actions;

export default showEventDetailsSlice.reducer;