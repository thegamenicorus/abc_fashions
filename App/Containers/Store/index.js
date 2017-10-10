import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import MasonryList from '@appandflow/masonry-list';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { Colors, Metrics } from '../../Themes';
import HeadroomNavigation from '../HeadroomNavigation'
import ListItem from '../../Components/ProductListItem/index';
import styles from '../Styles/StoreStyles';

class Store extends Component {
  state = { store: null, }

  constructor(props) {
    super(props)

    const storeId = props.navigation.state.params.storeId;    
    const store = this.props.stores.find(store => store.storeId === storeId);
    const storeProducts = this.props.products.filter(product => product.storeId === storeId);

    this.state = {
      store,
      productListItems: storeProducts,
      loading: false,
    }
  }

  onProductPress = (productId) => {
    this.props.navigation.navigate('Product', { productId });
  }

  renderProductList = () => {    
    const { store } = this.state;
    if(this.state.loading || this.state.productListItems.length === 0)
      return null;
    return (
      <View style={[styles.itemsContainer, styles.avoidTabBottom]}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.textNormal}>Featured Items</Text>
        </View>

        <MasonryList
          ref='list'
          style={styles.container}
          data={this.state.productListItems}
          renderItem={({ item }) => <ListItem item={item} onPress={this.onProductPress} />}
          getHeightForItem={({ item }) => 10}
          numColumns={2}
          keyExtractor={item => item.productId}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}        
        />
      </View>
    )
  }

  render() {
    
    const { store } = this.state;
    if (!store)
      return null;
    return (
      <HeadroomNavigation title={store.name} onLeftPress={() => { this.props.navigation.goBack() }}>
        <View style={styles.container}>
          <View style={styles.storeDetailContainer}>
            <View style={[styles.logoContainer, {backgroundColor: store.color}]}>
              <Image source={{uri: store.imageUrl}} resizeMode='cover' style={[styles.logo]}/>
            </View>
            <Text style={[styles.title]}>{store.name}</Text>
            <Text style={[styles.textSmall]}>
              <Icon size={14} color={Colors.charcoal} name='ios-pin'/> { store.location }
            </Text>
            <Text style={[styles.textSmall, styles.textDescription]}>
              {store.description}
            </Text>
          </View>
          {this.renderProductList()}
        </View>
      </HeadroomNavigation>
    );
  }
}
const mapStateToProps = (state) => {
  const {data} = state;
  return {
    products: data.products,
    stores: data.stores
  }
}

export default connect(mapStateToProps)(Store)