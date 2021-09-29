import { put, takeEvery, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { changeEventKeyPassword, login, setToken } from './authSlice';
import { setUser } from '../user/userSlice';
import { makeRequest } from '../../utils/makeRequest';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1323';

function* changeEventKeyPasswordSaga(action: PayloadAction<{ password: string, token: string }>) {
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/eventkey/password`, 'POST', { password: action.payload.password }, action.payload.token);
  if (success) {
    console.log('SUCCESS changing password', data);
    toast("Event key password changed!");
  }
  if (error) {
    console.log("FAILED TO change event key. Error:", error);
    toast(`Error changing event key password. Please try again. ${error.message}.`);
  }
}

function* loginUser(action: PayloadAction<{ username?: string; password: string; name?: string; email?: string; }>) {
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
      name: "SFA",
      email: "susan@startupsforall.org",
      username: action.payload.username,
      isAdmin: true
    }
  }
  const { success, data, error } = yield call(makeRequest, `${BASE_URL}/${endpoint}`, 'POST', action.payload);

  if (success) {
    yield put(setUser(finalPayload));
    yield put(setToken({ token: data.access_token }));
    if (action.payload.email) {
      toast("Approved to create events!");
    } else {
      toast("Welcome SFA Events Calendar Admin!");
    }
  }
  if (error) {
    // handle api error
    error.json().then((errData: any) => {
      toast(`Error verifying credentials. Please try again. ${errData.message}.`);
      console.log('failed login to create events...', errData);
    })
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchAllAuth() {
  yield takeEvery(login, loginUser);
  yield takeEvery(changeEventKeyPassword, changeEventKeyPasswordSaga);
}
