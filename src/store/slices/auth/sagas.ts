import { put, takeEvery, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { login, setToken } from './authSlice';
import { setUser } from '../user/userSlice';
import { makeRequest } from '../../utils/makeRequest';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* loginUser(action: PayloadAction<{ username: string; password: string }>) {
  console.log('LOGGING IN', action.payload.username);
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/login`, 'POST', action.payload);
  if (success) {
    console.log('SUCCESS LOGIN', data);
    yield put(setToken({ token: data.access_token }));
    yield put(setUser({ username: action.payload.username }));
  }
  if (error) {
    // handle api error
    console.log('FAIL LOGIN');
    console.error(error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllAuth() {
  yield takeEvery(login, loginUser);
}
