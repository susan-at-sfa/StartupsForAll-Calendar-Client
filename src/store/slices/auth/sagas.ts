import { put, takeEvery, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { register, login, setToken } from './authSlice';
import { setUser } from '../user/userSlice';
import { makeRequest } from '../../utils/makeRequest';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* registerUser(action: PayloadAction<{ username: string; password: string; email: string }>) {
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/register`, 'POST', action.payload);
  if (success) {
    console.log(success, data);
    yield put(setUser(data));
  }
  if (error) {
    // handle api error
    console.error(error);
  }
}

function* loginUser(action: PayloadAction<{ username: string; password: string }>) {
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/login`, 'POST', action.payload);
  if (success) {
    yield put(setToken({ token: data.access_token }));
  }
  if (error) {
    // handle api error
    console.error(error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllAuth() {
  yield takeEvery(register({ username: '', email: '', password: '' }).type, registerUser);
  yield takeEvery(login({ username: '', password: '' }).type, loginUser);
}
