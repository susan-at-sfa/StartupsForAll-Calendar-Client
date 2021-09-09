import { call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { saveNewEvent } from './newEventSlice';
import { makeRequest } from '../../utils/makeRequest';
import NewEvent from '../../../constants/NewEvent.d';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* saveNewEventSaga(action: PayloadAction<{ form: NewEvent, token: string }>) {
  let endpoint = `events`
  console.log('savenewEventSaga with action.payload:', action.payload);
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'POST', action.payload.form, action.payload.token);
  if (success) {
    console.log('success saving new event', data);
  }
  if (error) {
    console.log('failed to save new event', error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllNewEvent() {
  yield takeEvery(saveNewEvent, saveNewEventSaga);
}
