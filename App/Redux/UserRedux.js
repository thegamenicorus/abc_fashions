import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'
import StorageService from '../Services/StorageServices'
import User from '../Data/Mock/user.json'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loadUser: null,
  loadUserDone: ['currentUser'],
  login: ['username', 'password'],
  loginSuccess: ['currentUser'],
  loginFailure: ['errorMessage'],
  updateUser: ['user'],
  updateUserDone: ['currentUser'],
  changePassword: ['newPassword'],
  changePasswordDone: ['currentUser'],
  logout: null,
  logoutDone: null,
})

export const UserTypes = Types

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentUser: null,
  error: false,
  errorMessage: '',
  loading: true,
  updated: false,
  passwordUpdated: false,
})

/* ------------- Reducers ------------- */

export const loadUser = (state) => state.merge({ loading: true, currentUser: null })
export const loadUserDone = (state, {currentUser}) => state.merge({ loading: false, currentUser })

export const login = (state, {username, password}) => state.merge({ error: false, errorMessage: ''})
export const loginSuccess = (state, {currentUser}) => state.merge({ currentUser })
export const loginFailure = (state, {errorMessage}) => state.merge({ error:true, errorMessage })

export const updateUser = (state, {user}) => state.merge({ updated: false, passwordUpdated: false  })
export const updateUserDone = (state, {currentUser}) => state.merge({ currentUser, updated: true })

export const changePassword = (state, {newPassword}) => state.merge({ updated: false, passwordUpdated: false })
export const changePasswordDone = (state, {currentUser}) => state.merge({ currentUser, passwordUpdated: true })

export const logout = (state) => state;
export const logoutDone = (state) => INITIAL_STATE.merge({ loading: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {  
  [Types.LOAD_USER]: loadUser,
  [Types.LOAD_USER_DONE]: loadUserDone,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.UPDATE_USER]: updateUser,
  [Types.UPDATE_USER_DONE]: updateUserDone,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_DONE]: changePasswordDone,
  [Types.LOGOUT_DONE]: logoutDone,
})
