import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import UserActions from '../../Redux/UserRedux'
import Background from '../../Images/blur_bg.jpg' 
import styles from '../Styles/LoginStyles'
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = animation => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};

class Login extends Component {
  state = {
    usernameAnimated: new Animated.Value(0),
    passwordAnimated: new Animated.Value(0),
    buttonAnimated: new Animated.Value(0),
    username: '',
    password: '',
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.error) {
      Alert.alert('Login', nextProps.errorMessage);
    }
  }

  componentDidMount() {
    //stagger animation
    Animated.stagger(100, [
      Animated.timing(this.state.usernameAnimated, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.passwordAnimated, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.buttonAnimated, {
        toValue: 1,
        duration: 200,
      }),
    ]).start(() => {
      this._usernameAnimated.getNode().focus();
    });
  }

  login = () => {
    Keyboard.dismiss();
    const {username, password} = this.state;
    this.props.login(username, password);
  }

  render() {
    const usernameAnimatedStyle = createAnimationStyle(this.state.usernameAnimated);
    const passwordAnimatedStyle = createAnimationStyle(this.state.passwordAnimated);
    const buttonAnimatedStyle = createAnimationStyle(this.state.buttonAnimated);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
        >
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1}}
          scrollEnabled={false}
        >
          <View style={styles.container} />
          <View style={styles.form}>
            <View style={styles.container}>
              <Text style={styles.title}>ABC Fashions</Text>
              <AnimatedTextInput
                ref={usernameAnimated => (this._usernameAnimated = usernameAnimated)}
                style={[styles.input, usernameAnimatedStyle]}
                placeholder='username'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
              />
              <AnimatedTextInput
                placeholder='password'
                style={[styles.input, passwordAnimatedStyle]}
                underlineColorAndroid='transparent'
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <TouchableOpacity onPress={this.login}>
                <Animated.View style={[styles.button, buttonAnimatedStyle]} >
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container} />
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { 
    error: user.error,
    errorMessage: user.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (username, passwordAnimated) => dispatch(UserActions.login(username, passwordAnimated))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
