import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import IconBadge from 'react-native-icon-badge';

const AnimatedIconBadge = Animated.createAnimatedComponent(IconBadge);

class TabBarBadge extends Component {

  state = {
    animation: new Animated.Value(0),
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('scu', this.props.count)
    if(this.props.count > 0) {
      this.startAnimation()
    }
  }

  startAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 2,
      friction: 5,
    }).start(({ finished }) => {
      if(finished)
        this.state.animation.setValue(0)
    })
  }

  render() {
    const { tintColor, focused, count } = this.props;
    const rotationInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 1.5, 1],
    });
    const animatedStyle = {
      transform: [
        { scale: rotationInterpolate},
      ],
    }
    return (
      <Animated.View style={animatedStyle}>
      <AnimatedIconBadge
        //MainViewStyle={[{transform: [{scale: 1}]}, animatedStyle]}
        MainElement={<Icon style={{width: 30}} size={30} name={focused ? 'ios-cart' : 'ios-cart-outline'} color={tintColor} />}
        BadgeElement={
          <Text style={{color:'#FFFFFF', fontSize: 9}}>{count}</Text>
        }
        IconBadgeStyle={
          {
            width:16,
            minWidth: 16,
            height:16,
            borderRadius: 10,
            padding: 1,
            backgroundColor: 'red'
          }
        }
        Hidden={count === 0}
      />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart } = state;
  return {
    count: cart.itemCount
  }
}

export default connect(mapStateToProps)(TabBarBadge);
