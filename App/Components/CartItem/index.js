import React, {Component} from 'react';
import {StyleSheet, Animated, View, Text, TouchableWithoutFeedback, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Themes'
import QuantityPicker from '../../Components/QuantityPicker';

import styles from '../Styles/CartItemStyles';

class CartItem extends Component {
  state = {
    quantity: 0,
    animation: new Animated.Value(1)
  }

  showPicker = () => {
    this.refs.picker.show()
  }

  selectQuantity = (quantityString) => {
    const { item } = this.props;
    const quantity = parseInt(quantityString);
    const price = item.price * quantity;
    this.props.onChangeQuantity(item.productId, quantity, price);
  }

  startRemoveAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 300
    }).start(({finished}) => {
      if(finished) {
        this.props.onRemovePress(this.props.item.productId);
        this.state.animation.setValue(1);
      }
    })
  }

  removeItem = () => {
    this.startRemoveAnimation()
  }

  render() {
    const { item, cartItem } = this.props;
    const animatedStyle = {transform: [{scale: this.state.animation}]}
    return (
      <Animated.View style={[styles.container, styles.row, animatedStyle]}>
        <View style={[styles.imageContainer]}>
          <Image 
            resizeMode='cover'
            source={{uri: item.imageUrl}}
            style={[styles.image, ]}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10, justifyContent: 'space-between'}}>
          <Text style={[styles.text, {fontWeight: 'bold'}]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.text]} numberOfLines={1}>${item.price.toFixed(2)}</Text>
          <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <TouchableOpacity style={{paddingVertical: 4, paddingHorizontal: 10, flex: 1, borderWidth: 1, borderRadius: 20, borderColor: Colors.table}} onPress={this.showPicker}>
              <View style={styles.rowCenterSpaceBetween}>
                <Text style={styles.textSmall}>{cartItem.quantity}</Text>
                <Icon name='ios-arrow-down' size={20} color={Colors.charcoal} style={{marginTop: 2}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 40}} onPress={this.removeItem}>
              <Icon name='ios-trash-outline' size={20} color={'gray'} style={{alignSelf:'center'}} />
            </TouchableOpacity>
          </View>
          
        </View>
        <QuantityPicker ref='picker' max={30} selected={cartItem.quantity.toString()} onSubmit={this.selectQuantity}/>
      </Animated.View>
    );
  }
}

CartItem.PropTypes = {
  item: PropTypes.object.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
}

export default CartItem;