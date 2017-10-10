import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types'

import { Colors, Metrics } from '../../Themes';
import Header from '../../Components/Header'
import Headroom from '../../Components/Headroom';
import styles from '../Styles/HeadroomNavigationStyles'

const HeadroomNavigation = ({ children, title, leftIcon, leftTitle, onLeftPress, rightIcon, rightTitle, onRightPress, style,  }) => {
  const header = (
    <Header 
      title={title}
      leftTitle={leftTitle}
      leftIcon={leftIcon}
      onLeftPress={onLeftPress}
      rightTitle={rightTitle}
      rightIcon={rightIcon}
      onRightPress={onRightPress}
    />
  );  
  return (
    <View style={[styles.mainContainer]}>
      <Headroom
        style={[styles.topBarContainer, style]}
        headerComponent={header}
        ScrollableComponent={ScrollView}
        statusBarHeight={Metrics.statusBarHeight}
        headerHeight={ 40 }
        scrollEventThrottle={ 16 }
        isOverlay={false}
      >
        {children}
      </Headroom>
    </View>
)};

HeadroomNavigation.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.string,
  onLeftPress: PropTypes.func
};

export default HeadroomNavigation;