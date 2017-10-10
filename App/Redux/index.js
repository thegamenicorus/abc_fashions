import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    cart: require('./CartRedux').reducer,
    user: require('./UserRedux').reducer,
    data: require('./DataRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
