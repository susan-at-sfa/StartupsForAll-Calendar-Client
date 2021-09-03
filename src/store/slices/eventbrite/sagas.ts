import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setEventbrite, requestEventbriteEvent } from './eventbriteSlice';
import { makeRequest } from '../../utils/makeRequest';
import EventbriteEvent from './EventbriteEvent';
import EventbriteFormatted from './EventbriteFormElement';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* fetchEvent(action: PayloadAction<{ id: string }>) {
  let endpoint = `events/event-brite/${action.payload.id}`
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'GET');

  if (success) {
    console.log('got eventbrite data. formatting... unformatted', data);
    const eventData: EventbriteEvent = {
      logo: data.logo,
    }
    let formElements: EventbriteFormatted[] = [
      {
        key: 'Changed',
        value: data.changed,
        type: 'hidden',
        placeholder: null,
        info: null,
        disabled: true
      },
      {
        key: 'Created',
        value: data.created,
        type: 'hidden',
        placeholder: null,
        info: null,
        disabled: true
      },
      {
        key: 'Id',
        value: data.id,
        type: 'text',
        placeholder: 'Id',
        info: null,
        disabled: true
      },
      {
        key: 'Name',
        value: data.name,
        type: 'text',
        placeholder: 'Name',
        info: null,
        disabled: false
      },
      {
        key: 'Summary',
        value: data.summary,
        type: 'text',
        placeholder: 'Summary',
        info: null,
        disabled: false
      },
      {
        key: 'Description', // TODO: see about getting this or leaving it off the entity entirely...
        value: data.description,
        type: 'text',
        placeholder: 'Description',
        info: null,
        disabled: false
      },
      {
        key: 'Url',
        value: data.url,
        type: 'text',
        placeholder: 'Url',
        info: null,
        disabled: true
      },
    ];
    if (data.series_dates) {
      console.log("FOUND A SERIES");
      // TODO: handle multi day/recurring events
      // eventData.series_dates = TODO: blah
    } else {
      console.log('SINGLE EVENT - not a series');
      formElements = [
        ...formElements,
        {
          key: 'Start Date',
          value: data.start.utc.split('T')[0],
          type: 'date',
          placeholder: null,
          info: null,
          disabled: true
        },
        {
          key: 'End Date',
          value: data.end.utc.split('T')[0],
          type: 'date',
          placeholder: null,
          info: null,
          disabled: true
        },
        {
          key: 'Start Time',
          value: data.start.utc.split('T')[1],
          type: 'text',
          placeholder: null,
          info: null,
          disabled: true
        },
        {
          key: 'End Time',
          value: data.start.utc.split('T')[1],
          type: 'text',
          placeholder: null,
          info: null,
          disabled: true
        },
      ];
    }
    eventData.form_elements = formElements;
    // TODO: get cost and append info = currency
    console.log('formatted', eventData);
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
