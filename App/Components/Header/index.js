import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../Themes';
import styles from '../Styles/HeaderStyles';

const Button = ({ iconName, title, onPress, style, textStyle }) => (
  <TouchableOpacity style={style} onPress={onPress}>
  {
    (iconName !== '') && (
      <Icon size={30} name={iconName} color={Colors.app}/>
    )
  }
  {
    (title && title !== '') && (
      <Text style={[styles.title, textStyle]}>{title}</Text>
    )
  }
  </TouchableOpacity>
);

const Header = ({ title, leftIcon, leftTitle, onLeftPress, rightIcon, rightTitle, onRightPress, style }) => (
  <View style={[styles.rowCenterSpaceBetween, styles.container, style]}>
    <Button iconName={leftIcon} title={leftTitle} onPress={onLeftPress} style={styles.leftButton} textStyle={styles.leftButtonText} />
    <View style={{flex:1, flexWrap: 'wrap', alignItems: 'center'}}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
    <Button iconName={rightIcon} title={rightTitle} onPress={onRightPress} style={styles.rightButton} textStyle={styles.rightButtonText} />
  </View>
);

Header.defaultProps = {
  title: '',
  leftIcon: 'ios-arrow-back',
};

export default Header;