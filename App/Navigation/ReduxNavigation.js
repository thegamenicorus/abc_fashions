import React from 'react'
import { BackHandler, Platform } from 'react-native';
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })

  if(Platform.OS === 'android'){
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log(navigation)
      dispatch({ type: 'Navigation/BACK' });
      return true;
    })
  }

  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
