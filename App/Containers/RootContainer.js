import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import UserActions from '../Redux/UserRedux'
import DataActions from '../Redux/DataRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Login from './Login'
import User from '../Data/Mock/user.json'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  
  componentWillMount() {
    this.props.loadUser()
    this.props.loadData()
    //this.loadUser()
  }

  componentDidMount () {    
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  renderScreen = () => {
    if(!this.props.currentUser)
      return <Login />
    return <ReduxNavigation />
  }

  render () {
    if(this.props.loading)
      return null;
    return (
      <View style={[styles.applicationView]}>
        <StatusBar barStyle="dark-content" backgroundColor="white" translucent  />
        {this.renderScreen()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    loading: user.loading,
    currentUser: user.currentUser,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loadUser: () => dispatch(UserActions.loadUser()),
  loadData: () => dispatch(DataActions.dataRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
