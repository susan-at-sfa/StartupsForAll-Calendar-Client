import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DbEventState {
  dbEvents: Record<any, any>
}

const initialState: DbEventState = {
  dbEvents: []
};

const dbEventSlice = createSlice({
  name: 'dbEvent',
  initialState,
  reducers: {
    getAllDbEvents(state) { },
    setAllDbEvents(state, action: PayloadAction<any[]>) {
      const dbEvents = action.payload;
      return { ...state, dbEvents }
    },
  }
})

export const { setAllDbEvents, getAllDbEvents } = dbEventSlice.actions;

export default dbEventSlice.reducer;