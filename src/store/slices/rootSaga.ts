import { all } from 'redux-saga/effects';
import { watchAllAuth } from './auth/sagas';
import { watchAllEventbrite } from './eventbrite/sagas';
import { watchAllNewEvent } from './newEvent/sagas';
import { watchAllDbEvent } from './dbEvent/sagas';

export default function* rootSaga() {
  yield all([watchAllAuth(), watchAllEventbrite(), watchAllNewEvent(), watchAllDbEvent()]);
}
