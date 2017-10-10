import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { DataTypes } from '../Redux/DataRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { getData } from './DataSagas'
import { loadUser, login, updateUser, changePassword, logout } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([  
    //data request with API as param
    takeLatest(DataTypes.DATA_REQUEST, getData, api),

    takeLatest(UserTypes.LOAD_USER, loadUser),
    takeLatest(UserTypes.LOGIN, login),
    takeLatest(UserTypes.UPDATE_USER, updateUser),
    takeLatest(UserTypes.CHANGE_PASSWORD, changePassword),
    takeLatest(UserTypes.LOGOUT, logout),
  ])
}
