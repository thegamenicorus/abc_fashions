import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dataRequest: null,
  dataSuccess: ['products', 'stores'],
  dataFailure: null
})

export const DataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  products: [],
  stores: [],
  fetching: false,
})

/* ------------- Reducers ------------- */

// request products and stores
export const request = (state) =>
  state.merge({ fetching: true, avatar: null })

// successful request data
export const success = (state, action) => {
  const { products, stores } = action
  return state.merge({ fetching: false, error: null, products, stores })
}

// failed to get data
export const failure = (state) =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DATA_REQUEST]: request,
  [Types.DATA_SUCCESS]: success,
  [Types.DATA_FAILURE]: failure
})
