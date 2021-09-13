import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DbEventState {
  dbEvents: Record<any, any>;
  topicFilters: string[];
  categoryFilters: string[];
  filterObject: Record<any | undefined, any | undefined>;
}

const initialState: DbEventState = {
  dbEvents: [],
  topicFilters: [],
  categoryFilters: [],
  filterObject: {
    categories: undefined,
    topics: undefined
  }
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
    setCategoryFilters(state, action: PayloadAction<string[]>) {
      const categoryFilters = action.payload;
      return { ...state, categoryFilters }
    },
    setAllDbEvents(state, action: PayloadAction<any[]>) {
      const dbEvents = action.payload;
      return { ...state, dbEvents }
    },

    /*
    ///////FOR SENDING FILTER OPTIONS TO DATABASE\\\\\\\

    setFilterObject(state, action: PayloadAction<Record<any | undefined, any | undefined>>) {
      const filterObject = action.payload;
      return { ...state, filterObject }
    },
    getFilteredEvents(filterObject) { },*/
  }
})

export const { setAllDbEvents, getAllDbEvents, setTopicFilters, setCategoryFilters } = dbEventSlice.actions;

export default dbEventSlice.reducer;