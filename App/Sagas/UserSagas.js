import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'
import StorageServices from '../Services/StorageServices';
import User from '../Data/Mock/user.json'

export function getSystemUser() {
  // load system user from AsyncStorage
  return StorageServices.get('user')
          .then(user => JSON.parse(user));
}

export function setSystemUser(user) {
  // save system user to AsyncStorage
  return StorageServices.set('user', JSON.stringify(user));
}

export function getSignedUser() {
  // load signin user from AsyncStorage
  return StorageServices.get('signed_user')
          .then(user => user);
}

export function setSignedUser(signed_user) {
  // save signin user to AsyncStorage
  return StorageServices.set('signed_user', signed_user);
}

export function removeSignedUser() {
  // remove singin user when log out
  return StorageServices.remove('signed_user');
}

export function * loadUser(action) {
  const user = yield call(getSystemUser);
  if(!user) {
    // if no system user -> save mock user from  'App/Data/Mock/user.json'
    yield call(setSystemUser, User)
  }
  const signed_user = yield call(getSignedUser);
  if(signed_user && signed_user == user.username) {
    //match user -> set as currentUser
    yield put(UserActions.loadUserDone(user));
  }
  else {
    //not match -> currentUser = null
    yield put(UserActions.loadUserDone(null));
  }
}

export function * login(action) {
  // compare username & password with system user
  const {username, password} = action;
  const user = yield call(getSystemUser);
  if(user.username === username && user.password === password) {
    yield call(setSignedUser, username);
    yield put(UserActions.loginSuccess(user));
  }
  else {
    yield put(UserActions.loginFailure('Wrong username or password'));
  }
}

export function * updateUser(action) {
  // update user profile
  const {user} = action;
  yield call(setSystemUser, user)
  yield call(setSignedUser, user.username);
  yield put(UserActions.updateUserDone(user));
}

export function * changePassword(action) {
  // update user password
  const {newPassword} = action;
  const user = yield call(getSystemUser);
  user.password = newPassword;
  yield call(setSystemUser, user)
  yield put(UserActions.changePasswordDone(user));
}

export function * logout(action) {
  // remove sign in user from Aysncstorage
  yield call(removeSignedUser);
  yield put(UserActions.logoutDone());
}