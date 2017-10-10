import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {
    Animated,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
} from 'react-native'
import { Metrics } from '../../Themes'


export default class Headroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: new Animated.Value(1), // The header height
      visible: true, // Is the header currently visible
    }
    // How long does the slide animation take
    this.slideDuration = this.props.slideDuration || 400
  }

  _onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y

    // Ignore scroll events outside the scrollview
    if (currentOffset < 0 || currentOffset > (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height)) {
      return
    }

    if ((this.state.visible && currentOffset > this.offset) ||
        (!this.state.visible && currentOffset < this.offset)) {
      this._toggleHeader()
    }

    this.offset = currentOffset
  }

  _toggleHeader() {
    Animated.timing(this.state.animation, {
      duration: this.slideDuration,
      toValue: this.state.visible ? 0 : 1,
    }).start()
    this.setState({visible: !this.state.visible})
  }

  render() {
    const { headerComponent, ScrollableComponent, isOverlay, headerHeight } = this.props;
    const translateYInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [headerHeight*-1, 0],
    });
    const animatedStyle = {
      opacity: this.state.animation,
      height: headerHeight,
      transform: [{
        translateY: translateYInterpolate
      }]
    }
    return (
      <View style={styles.container}>
        <ScrollableComponent
          onScroll={this._onScroll.bind(this)}
          {...this.props}
        >
          <View style={!isOverlay ? {marginTop: headerHeight} : undefined}>
            {this.props.children}
          </View>
        </ScrollableComponent>
        <Animated.View style={[styles.header, animatedStyle]}>
          {headerComponent}
        </Animated.View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex:1,
    position: 'absolute',
    top: Metrics.statusBarHeight,
    left: 0,
    right: 0,
    //overflow: 'hidden',
  },
})