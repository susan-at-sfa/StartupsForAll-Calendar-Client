import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DbEventState {
  dbEvents: Record<any, any>;
  topicFilters: string[];
}

const initialState: DbEventState = {
  dbEvents: [],
  topicFilters: []
};

const dbEventSlice = createSlice({
  name: 'dbEvent',
  initialState,
  reducers: {
    getAllDbEvents() { },
    setTopicFilters(state, action: PayloadAction<string[]>) {
      const topicFilters = action.payload;
      return { ...state, topicFilters }
    },
    setAllDbEvents(state, action: PayloadAction<any[]>) {
      const dbEvents = action.payload;
      return { ...state, dbEvents }
    },
  }
})

export const { setAllDbEvents, getAllDbEvents, setTopicFilters } = dbEventSlice.actions;

export default dbEventSlice.reducer;