import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setEventbrite, requestEventbriteEvent, EventbriteEvent } from './eventbriteSlice';
import { makeRequest } from '../../utils/makeRequest';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* fetchEvent(action: PayloadAction<{ id: string }>) {
  let endpoint = `events/event-brite/${action.payload.id}`
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'GET');

  if (success) {
    console.log('got eventbrite data:', data);
    let start, end;
    if (data.series_dates) {
      console.log("FOUND A SERIES");
      // TODO: where to handle this?
    } else {
      start = data.start.utc;
      end = data.end.utc;
    }
    // NOTE FROM ELLY:
    // Here we are constructing our own local event brite event object based on the returned data from the api call.
    // We can (and probably should) transform the eventbrite external api response to a preferred shape on the API side instead.
    const eventData: EventbriteEvent = {
      ...data,
      name: data.name,
      start: start,
      end: end,
    }
    yield put(setEventbrite(eventData));
  }
  if (error) {
    console.error(error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllEventbrite() {
  yield takeLatest(requestEventbriteEvent, fetchEvent);
}
