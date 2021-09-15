import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeRequest } from '../../utils/makeRequest';
import { setAllDbEvents, getAllDbEvents } from './dbEventSlice';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

export function* fetchAllDbEvents() {
  /*RETURNS EVENTS IN ASC ORDER BY DATE. CURRENTLY MAKES CALL TO ordered_date ENDPOINT WHICH WILL BE CHANGING*/
  // const { success, data, error } = yield call(makeRequest, `${BASE_URL}/events/ordered_date`, "GET");
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/events`, "GET");

  if (success) {
    yield put(setAllDbEvents(data));
  }
  if (error) {
    error.json().then((errData: any) => {
      toast(`Error getting events info. Please try again. ${errData.message}.`);
      console.log('Unable to pull events data from API:', errData);
    })
  }
}

export function* watchAllDbEvent() {
  yield takeLatest(getAllDbEvents, fetchAllDbEvents);
}