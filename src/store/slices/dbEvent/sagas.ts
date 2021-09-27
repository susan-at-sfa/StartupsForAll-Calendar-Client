import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeRequest } from '../../utils/makeRequest';
import { setAllDbEvents, getAllDbEvents, getDbEventsByFilter, setTopicFilters, setCategoryFilters } from './dbEventSlice';
import { setFilterModalOpen } from '../filterModal/showFilterModalSlice';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

export function* fetchAllDbEvents() {
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
  let query = "?";
  if (dispatch.payload) {
    const { categories, topics } = dispatch.payload;
    console.log("destructured topics and categories", topics, categories);
    if (categories) {
      query += "category=";
      categories.forEach((category: string) => query += category + ",");
      // remove the extra comma
      query = query.substring(0, query.length - 1);
    }
    if (categories && topics) {
      query += "&";
    }
    if (topics) {
      query += "topics=";
      topics.forEach((topic: string) => query += topic + ",");
      // remove the extra comma
      query = query.substring(0, query.length - 1);
    }

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
    yield put(setFilterModalOpen(false));
    yield put(setTopicFilters([]));
    yield put(setCategoryFilters([]));
    yield put(setFilterModalOpen(false));
  }
}

export function* watchAllDbEvent() {
  yield takeEvery(getAllDbEvents, fetchAllDbEvents);
  yield takeEvery(getDbEventsByFilter, fetchDbEventsByFilter);
}