import { put, call, takeLatest } from 'redux-saga/effects';
import { makeRequest } from '../../utils/makeRequest';
import { setAllDbEvents, getAllDbEvents } from './dbEventSlice';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

export function* fetchAllDbEvents() {
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/events`, "GET");

  if (success) {
    yield put(setAllDbEvents(data));
  }
  if (error) {
    console.log(error)
  }
}

export function* watchAllDbEvent() {
  yield takeLatest(getAllDbEvents, fetchAllDbEvents);
}