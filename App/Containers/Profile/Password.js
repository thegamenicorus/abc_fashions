import React, { Component } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, Image, TextInput, Alert 
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';

import { Colors, Metrics } from '../../Themes';
import UserActions from '../../Redux/UserRedux'
import DefaultPhoto from '../../Images/user.png'
import HeadroomNavigation from '../HeadroomNavigation'
import styles from '../Styles/ProfilePasswordStyles'

class Profile extends Component {
  state = {  
    //...this.props.currentUser
    currentPassword: '',
    newPassword: '',
    verifyPassword: '',
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.passwordUpdated) {
      this.alert('Saved successfully.', [
        {text: 'OK', onPress: () => this.props.navigation.goBack()}
      ])
    }
  }

  alert(message, customButton) {
    Alert.alert('Password', message, customButton);
  }

  saveProfile = () => {
    Keyboard.dismiss();
    if(this.validate()) {      
      this.props.changePassword(this.state.newPassword);
    }
  }

  validate = () => {
    const { currentPassword, newPassword, verifyPassword } = this.state;

    if(!currentPassword) {
      this.alert('Current is required.');
      return false;
    }
    else if(!newPassword) {
      this.alert('New is required.');
      return false;
    }
    else if(!verifyPassword) {
      this.alert('Verify is required.');
      return false;
    }
    else if(newPassword !== verifyPassword) {
      this.alert('Passwords do not match.');
      return false;
    }
    else if(currentPassword != this.props.currentUser.password) {
      this.alert('Your old password was entered incorrectly.');
      return false;
    }

    return true;
  }

  render() {
    const { currentPassword, newPassword, verifyPassword } = this.state;
    return (
      <HeadroomNavigation 
        style={styles.container} 
        title='Password' 
        rightTitle='Save'
        onLeftPress={() => { this.props.navigation.goBack() }}
        onRightPress={() => { this.saveProfile() }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >          
          <View style={[styles.table]}>
            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableLeftTop]}>
                <Text style={styles.tableTitle}>Current</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableRightTop]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(currentPassword) => this.setState({currentPassword})} 
                  value={currentPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableMiddle]}>
                <Text style={styles.tableTitle}>New</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(newPassword) => this.setState({newPassword})} 
                  value={newPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableLeftBottom]}>
                <Text style={styles.tableTitle}>Verify</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableRightBottom]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(verifyPassword) => this.setState({verifyPassword})}
                  value={verifyPassword}
                  secureTextEntry
                />
              </View>
            </View>
          </View>          
        </KeyboardAwareScrollView>
      </HeadroomNavigation>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { 
    currentUser: user.currentUser,
    passwordUpdated: user.passwordUpdated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (newPassword) => {dispatch(UserActions.changePassword(newPassword))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)