import { all } from 'redux-saga/effects';
import { watchAllAuth } from './auth/sagas';

export default function* rootSaga() {
  yield all([watchAllAuth()]);
}
