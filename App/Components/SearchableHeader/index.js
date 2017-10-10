import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import styles from '../Styles/SearchableHeaderStyles'

export default class SearchableHeader extends Component {
  
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}