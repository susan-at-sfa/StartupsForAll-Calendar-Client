import { all } from 'redux-saga/effects';
import { watchAllAuth } from './auth/sagas';
import { watchAllEventbrite } from './eventbrite/sagas';

export default function* rootSaga() {
  yield all([watchAllAuth(), watchAllEventbrite()]);
}
