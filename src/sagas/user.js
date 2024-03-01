import { call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, registerUser, logoutUser } from '../api/api';
import {
  userLoginSuccess,
  userLoginFailed,
  userLoginRequested,
  userLogoutSuccess
} from "../reducers/userSlice";
import {
  userRegistrationRequested,
  userRegistrationFailed,
  userRegistrationSuccess
} from "../reducers/userRegistrationSlice";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* userLogin(action) {
  yield put(userLoginRequested());
  const user = yield call(loginUser, action.payload);
  if (user.error) {
    yield put(userLoginFailed(user.error.message));
  } else {
    yield put(userLoginSuccess(user.data.body));
  }
}

function* userRegistration(action) {
  yield put(userRegistrationRequested());
  const registration = yield call(registerUser, action.payload);
  if (registration.error) {
    yield put(userRegistrationFailed(registration.error.message));
  } else {
    yield put(userRegistrationSuccess(registration.data.body));
  }
}

function* userLogout() {
  yield call(logoutUser);
  yield put(userLogoutSuccess());
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* userSaga() {
//   yield takeEvery('USER_LOGIN_REQUESTED', fetchUser)
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* loginSaga() {
  yield takeLatest('USER_LOGIN_REQUESTED', userLogin)
}

function* userRegistrationSaga() {
  yield takeLatest('USER_REGISTRATION_REQUESTED', userRegistration)
}

function* userLogoutSaga() {
  yield takeLatest('USER_LOGOUT_REQUESTED', userLogout)
}

export { loginSaga, userRegistrationSaga, userLogoutSaga }