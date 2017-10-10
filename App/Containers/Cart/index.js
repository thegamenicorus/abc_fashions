import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux'

import { Colors, Metrics } from '../../Themes';
import HeadroomNavigation from '../HeadroomNavigation'
import CartItem from '../../Components/CartItem';
import styles from '../Styles/CartStyles';
import CartAction from '../../Redux/CartRedux'

class Store extends Component {
  state = { store: null, }

  constructor(props) {
    super(props)
  }

  onProductPress = (productId) => {
    this.props.navigation.navigate('Product', { productId });
  }

  onChangeQuantity = (productId, quantity, price) => {
    this.props.adjustItem({ productId, quantity, price });
  }

  onRemovePress = (productId) => {
    this.props.removeItem(productId);
  }

  checkout = () => {
    this.props.navigation.navigate('Checkout');
  }

  renderEmptyCart = () => {
    return (
      <View style={[styles.center, {flex: 1}]}>
        <Icon name='ios-cart-outline' size={80} color={Colors.charcoal} />
        <Text style={styles.description}>Your shopping cart is empty</Text>
      </View>
    );
  }

  renderCartItems = () => {
    return this.props.items.map((cartItem, index) => {
      const item = this.props.products.find(product => product.productId === cartItem.productId)
      return (
        <CartItem key={index} item={item} cartItem={cartItem} onChangeQuantity={this.onChangeQuantity} onRemovePress={this.onRemovePress}/>
      )
    })
  }

  renderCart = () => {
    const { count, items, totalPrice } = this.props;
    if(items.length == 0)
      return (
        <View style={[styles.empyCartContainer]}>
          {this.renderEmptyCart()}
        </View>
      )
    return (
      <View style={styles.container}>
        <View style={[styles.rowCenter, styles.totalContainer]}>
          <Text style={[styles.textSmall]}>Order total ({items.length} {items.length > 1 ? 'items' : 'item'}):</Text>
          <Text style={[styles.totalPrice]}>${totalPrice.toFixed(2)}</Text>
        </View>
        {this.renderCartItems()}
        <TouchableOpacity style={styles.button} onPress={this.checkout}>
          <Text style={styles.butonText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <HeadroomNavigation style={styles.container} title='My Cart' leftIcon='' onLeftPress={() => { this.props.navigation.goBack() }}>
        <View style={[styles.cartContainer]}>
          {this.renderCart()}
        </View>
      </HeadroomNavigation>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart, data } = state;
  return { 
    products: data.products,
    items: cart.items,
    totalPrice: cart.totalPrice,
    count: cart.itemCount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustItem: (item) => {dispatch(CartAction.adjustItem(item))},
    removeItem: (productId) => {dispatch(CartAction.removeItem(productId))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)