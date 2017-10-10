import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Picker } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';

import HeadroomNavigation from '../HeadroomNavigation'
import { Colors, Metrics } from '../../Themes';
import styles from '../Styles/ProductStyles';
import QuantityPicker from '../../Components/QuantityPicker';
import CartAction from '../../Redux/CartRedux'

class Product extends Component {
  state = { product: null, }

  constructor(props) {
    super(props)

    const productId = props.navigation.state.params.productId;
    const product = this.props.products.find(product => product.productId === productId);
    const store = this.props.stores.find(store => store.storeId === product.storeId);
    this.state = {
      product,
      store,
      quantity: 1
    }
  }

  addToCart = () => {
    const { product, quantity } = this.state;
    const price = quantity * product.price;
    this.props.addToCart({ productId: product.productId, price, quantity})
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  onStorePress = (storeId) => {
    this.props.navigation.navigate('Store', { storeId });
  }

  showPicker = () => {
    this.refs.picker.show()
  }

  selectQuantity = (quantity) => {
    this.setState({quantity: parseInt(quantity)})
  }

  render() {
    const { product, store, quantity } = this.state;
    
    if (!product)
      return null;
    return (
      <HeadroomNavigation title={product.name} onLeftPress={() => { this.props.navigation.goBack() }}>
        <View style={styles.container}>
          <View style={[styles.avoidTabBottom, {paddingHorizontal: 10,}]}>
            <Text style={[styles.title]}>
              {product.name}
            </Text>
            <Text style={[styles.price]}>
              ${product.price.toFixed(2)}
            </Text>
            
            <View style={[styles.imageContainer, {backgroundColor: product.color}]}>
              <AutoHeightImage
                style={[styles.card, ]}
                width={Metrics.screenWidth - 20}
                imageURL={product.imageUrl}
              />
            </View>
              
            <Text style={[styles.description]}>
              {product.description}
            </Text>
    
            <View style={[styles.table]}>
              <View style={styles.rowCenter}>
                <View style={[styles.tableTitleContainer, styles.tableLeftTop]}>
                  <Text style={styles.tableTitle}>Category</Text>
                </View>
                <View style={[styles.tableDescriptionContainer, styles.tableRightTop]}>
                  <Text style={styles.tableDescription}>{product.category}</Text>
                </View>
              </View>
    
              <View style={[styles.rowCenter,]}>
                <View style={[styles.tableTitleContainer, styles.tableMiddle, styles.tableFullHeight]}>
                  <View style={styles.centerVerical}>
                    <Text style={styles.tableTitle}>From</Text>
                  </View>
                </View>
                <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                  <TouchableOpacity style={styles.rowCenterSpaceBetween} onPress={() => this.onStorePress(store.storeId)}>
                    <View style={styles.container}>
                      <Text style={[styles.tableDescription, styles.link]}>{ store.name }</Text>
                      <Text style={[styles.tableDescription, styles.textSmall]}>
                        <Icon size={14} color={Colors.charcoal} name='ios-pin' /> { store.location }
                      </Text>
                    </View>
                    <Icon size={24} color={Colors.charcoal} name='ios-arrow-forward' />
                  </TouchableOpacity>
                </View>
              </View>
    
              <View style={styles.rowCenter}>
                <View style={[styles.tableTitleContainer, styles.tableMiddle]}>
                  <Text style={styles.tableTitle}>Postage</Text>
                </View>
                <View style={[styles.tableDescriptionContainer, styles.tableMiddle]}>
                  <Text style={[
                    styles.tableDescription, 
                    {color: product.postageType==='Free'? Colors.free : Colors.paid }
                  ]}>
                    {this.capitalize(product.postageType)}
                  </Text>
                </View>
              </View>
    
              <View style={styles.rowCenter}>
                <View style={[styles.tableTitleContainer, styles.tableLeftBottom]}>
                  <Text style={styles.tableTitle}>Quantity</Text>
                </View>
                <View style={[styles.tableDescriptionContainer, styles.tableRightBottom]} >
                  <TouchableOpacity style={styles.rowCenterSpaceBetween} onPress={this.showPicker}>
                    <Text style={styles.tableDescription}>
                      {quantity}
                    </Text>
                    <Icon size={24} color={Colors.charcoal} name='ios-arrow-down' />
                  </TouchableOpacity>
                </View>
              </View>
    
              <TouchableOpacity style={styles.button} onPress={this.addToCart}>
                <Text style={styles.butonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
            <QuantityPicker ref='picker' max={30} selected={quantity.toString()} onSubmit={this.selectQuantity}/>
          </View>
        </View>
      </HeadroomNavigation>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart, data } = state;
  return {
    cart,
    products: data.products,
    stores: data.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {dispatch(CartAction.addItem(item))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)