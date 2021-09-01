import { put, takeEvery, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { login, setToken } from './authSlice';
import { setUser } from '../user/userSlice';
import { makeRequest } from '../../utils/makeRequest';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* loginUser(action: PayloadAction<{ username?: string; password: string; name?: string; email?: string; }>) {
  console.log('LOGGING IN', action);
  let endpoint;
  let finalPayload;
  if (action.payload.email) {
    // email is only provided for event key auth
    endpoint = 'confirm-privileges'
    finalPayload = {
      name: action.payload.name,
      email: action.payload.email,
      isAdmin: false
    }
  } else {
    // admin user login
    endpoint = 'login'
    finalPayload = {
      username: action.payload.username,
      isAdmin: true
    }
  }
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'POST', action.payload);

  if (success) {
    console.log('SUCCESS LOGIN', data);
    yield put(setUser(finalPayload));
    yield put(setToken({ token: data.access_token }));
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
