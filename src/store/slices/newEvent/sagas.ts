import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { makeRequest } from '../../utils/makeRequest';
import { resetEvent, saveNewEvent, updateExistingEvent } from './newEventSlice';
import { getAllDbEvents } from "../dbEvent/dbEventSlice";
import NewEvent from '../../../constants/NewEvent.d';
import { emptyEvent } from '../../../constants/NewEvent';
import { resetEventBrite } from '../eventbrite/eventbriteSlice';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

export function* saveNewEventSaga(action: PayloadAction<{ form: NewEvent, token: string }>) {
  let endpoint = `events`
  console.log('savenewEventSaga with action.payload:', action.payload);
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'POST', action.payload.form, action.payload.token);
  if (success) {
    toast("New Event created successfully!");
    console.log('SUCCESS saving new event', data);
    yield put(resetEvent(emptyEvent));
    yield put(resetEventBrite(emptyEvent));
    yield put(getAllDbEvents());
  }
  if (error) {
    console.log("FAILED TO SAVE EVENT. got raw error of:", error);
    if (error.status === 400) {
      toast("This event already exists on the calendar.");
      yield put(resetEvent(emptyEvent));
      yield put(resetEventBrite(emptyEvent));
    } else {
      toast(`Error creating new event. Please try again. ${error.message}.`);
    }
  }
}

export function* updateExistingEventSaga(action: PayloadAction<{ form: NewEvent, token: string, id: string }>) {
  let endpoint = `events`
  console.log('savenewEventSaga with action.payload:', action.payload, action.payload.id);
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}/${action.payload.id}`, 'PATCH', action.payload.form, action.payload.token);
  if (success) {
    toast("Event Updated successfully!");
    console.log('SUCCESS saving event updates', data);
    yield put(resetEvent(emptyEvent));
    yield put(resetEventBrite(emptyEvent));
    yield put(getAllDbEvents());
  }
  if (error) {
    console.log("FAILED TO SAVE EVENT. got raw error of:", error);
    if (error.status === 400) {
      toast("This event already exists on the calendar.");
      yield put(resetEvent(emptyEvent));
      yield put(resetEventBrite(emptyEvent));
    } else {
      toast(`Error creating new event. Please try again. ${error.message}.`);
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllNewEvent() {
  yield takeEvery(saveNewEvent, saveNewEventSaga);
  yield takeEvery(updateExistingEvent, updateExistingEventSaga);
}
