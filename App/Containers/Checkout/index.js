import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { LiteCreditCardInput } from "react-native-credit-card-input";

import { Colors, Metrics } from '../../Themes';
import HeadroomNavigation from '../HeadroomNavigation'
import CartAction from '../../Redux/CartRedux'
import styles from '../Styles/CheckoutStyles';

class Store extends Component {
  state = { 
    cardValid: false,
    payed: false,
    loading: false,
  }

  onChange = cardData => {
    this.setState({
      cardValid: cardData.valid
    });
  };

  pay = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.props.clearCart()
      this.setState({ loading: false, payed: true })
    }, 2000);
  }

  renderSuccessPage() {
    return (
      <View style={[{flex: 1, alignItems: 'center', marginTop: 40}]}>
        <Icon name='ios-checkmark-circle-outline' size={80} color={Colors.success} />
        <Text style={styles.description}>Your order is successful</Text>
        <TouchableOpacity style={[styles.button, {paddingHorizontal: 30}]} onPress={() => {this.props.navigation.goBack()}}>
          <Text style={styles.butonText}>Done</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderForm() {
    if(this.state.payed)
      return (
        <View style={styles.container}>
          {this.renderSuccessPage()}
        </View>
      )
    return (
      <View style={styles.container}>
        <View style={[styles.cardContainer]}>
          <LiteCreditCardInput
            autoFocus
            inputStyle={styles.input}

            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onChange={this.onChange} 
          />
        </View>
        <View style={[styles.row, {padding: 20, alignItems: 'center'}]}>
          <Icon name='md-lock' size={20} color='gray'/>
          <Text style={styles.text}>Payments will only take place over HTTPS and is SSL certified. You are safe!</Text>
        </View>
        { (this.state.cardValid) && (
          <TouchableOpacity style={styles.button} onPress={this.checkout} disabled={this.state.loading} onPress={this.pay}>
            { (this.state.loading) && (
              <ActivityIndicator size='small' color='white' />
            )}
            { (!this.state.loading) && (
              <Text style={styles.butonText}>Pay ${this.props.totalPrice.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    )
  }

  render() {
    return (
      <HeadroomNavigation title='Credit Card' leftIcon='ios-close' onLeftPress={() => { this.props.navigation.goBack() }}>
        {this.renderForm()}
      </HeadroomNavigation>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart } = state;
  return { 
    items: cart.items,
    totalPrice: cart.totalPrice,
    count: cart.itemCount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {dispatch(CartAction.clear())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)