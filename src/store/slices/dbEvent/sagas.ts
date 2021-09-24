import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeRequest } from '../../utils/makeRequest';
import { setAllDbEvents, getAllDbEvents, getDbEventsByFilter } from './dbEventSlice';

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

export function* fetchDbEventsByFilter(dispatch: any) {
  console.log("HIT fetch db events by filter saga with filter:", dispatch);
  // TODO: transform and send request
  let query = "?";
  if (dispatch.payload) {
    const { categories, topics } = dispatch.payload;
    if (categories) {
      query += "category=";
      categories.forEach((category: string) => query += category + ",");
    }
    // remove the extra comma
    query = query.substring(0, query.length - 1);
    if (categories && topics) {
      query += "&";
    }
    if (topics) {
      query += "topics=";
      topics.forEach((topic: string) => query += topic + ",");
    }
    // remove the extra comma
    query = query.substring(0, query.length - 1);

    const url = `${BASE_URL}/events${query}`;
    console.log("Making query:", url);
    const { success, data, error } = yield call(makeRequest, url, "GET");

    if (success) {
      yield put(setAllDbEvents(data));
    }
    if (error) {
      error.json().then((errData: any) => {
        toast(`Error getting events info. Please try again. ${errData.message}.`);
        console.log('Unable to pull events data from API w/query string:', errData);
      })
    }
  }
}

export function* watchAllDbEvent() {
  yield takeEvery(getAllDbEvents, fetchAllDbEvents);
  yield takeEvery(getDbEventsByFilter, fetchDbEventsByFilter);
}