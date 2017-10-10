import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, 
  TouchableWithoutFeedback, Image, TextInput, Alert,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';

import { Colors, Metrics } from '../../Themes';
import UserActions from '../../Redux/UserRedux';
import DefaultPhoto from '../../Images/user.png';
import HeadroomNavigation from '../HeadroomNavigation';
import styles from '../Styles/ProfileStyles';

class Profile extends Component {
  state = {  
    ...this.props.currentUser
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.profileUpdated){
      Alert.alert('Profile','Saved successfully.');
    }
  }

  changePassword = () => {
    this.props.navigation.navigate('Password');
  }

  changePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    //trigger image picker menu
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source = {uri: response.uri};
        this.setState({
          photo: source,
        });
      }
    });
  }

  logout = () => {
    this.props.navigation.navigate('Home')
    this.props.logout();
  }

  saveProfile = () => {
    Keyboard.dismiss();
    const newProfile = {
      ...this.state
    }
    this.props.updateUser(newProfile); 
  }

  render() {
    const { firstname, lastname, username, email, photo, address } = this.state;
    return (
      <HeadroomNavigation 
        style={styles.container} 
        title='Profile' 
        leftIcon='' 
        rightTitle='Save'
        onRightPress={() => { this.saveProfile() }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.container, {paddingBottom: 20}]}
         // scrollEnabled={false}
        >
          <View style={[styles.container, {alignItems: 'center'}]}>
            <TouchableWithoutFeedback onPress={this.changePhoto}>
              <View style={[styles.container, {borderRadius: 60}]}>
                <Image source={photo || DefaultPhoto} style={{width: 120, height: 120, borderRadius: 60}} />            
              <Text style={[styles.textSmall, {marginTop: 10}]}>Change Profile Photo</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.table]}>
            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableLeftTop]}>
                <Text style={styles.tableTitle}>Firstname</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableRightTop]}>
                <TextInput 
                  style={styles.tableDescription} 
                  underlineColorAndroid='transparent'
                  onChangeText={(firstname) => this.setState({firstname})} 
                  value={firstname}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableMiddle]}>
                <Text style={styles.tableTitle}>Lastname</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(lastname) => this.setState({lastname})} 
                  value={lastname}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableMiddle]}>
                <Text style={styles.tableTitle}>Username</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(username) => this.setState({username})}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={username}
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableMiddle]}>
                <Text style={styles.tableTitle}>Email</Text>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={email}
                />
              </View>
            </View>

            <View style={styles.rowCenter}>
              <View style={[styles.tableTitleContainer, styles.tableLeftBottom, styles.tableFullHeight]}>
                <View style={styles.centerVerical}>
                  <Text style={styles.tableTitle}>Address</Text>
                </View>
              </View>
              <View style={[styles.tableDescriptionContainer, styles.tableRightBottom, {height: 100}]}>
                <TextInput 
                  style={styles.tableDescription}
                  underlineColorAndroid='transparent'
                  multiline = {true}
                  numberOfLines={4} 
                  autoCorrect={false}
                  onChangeText={(address) => this.setState({address})} value={address}
                />
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <TouchableWithoutFeedback onPress={this.changePassword}>
              <View style={[styles.rowCenterSpaceBetween, styles.buttonTop]}>
                <Text style={styles.tableDescription}>Change password</Text>
                <Icon size={24} color={Colors.charcoal} name='ios-arrow-forward' />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.logout}>
              <View style={styles.buttonBottom}>
                <Text style={[styles.tableDescription, styles.red]}>Log Out</Text>
              </View>
            </TouchableWithoutFeedback>
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
    profileUpdated: user.updated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {dispatch(UserActions.updateUser(user))},
    logout: () => {dispatch(UserActions.logout())}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)