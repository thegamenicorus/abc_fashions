import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import MasonryList from '@appandflow/masonry-list';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { Colors, Metrics } from '../../Themes';
import HeadroomNavigation from '../HeadroomNavigation'
import ListItem from '../../Components/ProductListItem/index';
import styles from '../Styles/HomeSearchStyles';

class Search extends Component {
  constructor(props) {
    super(props)

    const keyword = props.navigation.state.params.keyword;    
    //const store = this.props.stores.find(store => store.storeId === storeId);
    const matchProducts = this.getMatchedProducts(keyword);

    this.state = {
      keyword,
      productListItems: matchProducts,
      loading: false,
    }
  }

  getMatchedProducts = (keyword) => {
    return this.props.products.filter( product => 
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.storeName.toLowerCase().includes(keyword.toLowerCase()) ||
      product.category.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  onProductPress = (productId) => {
    this.props.navigation.navigate('Product', { productId });
  }

  renderProductList = () => {
    return (
      <View style={[styles.itemsContainer, styles.avoidTabBottom]}>
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
    const { keyword } = this.state;
    return (
      <HeadroomNavigation title={keyword} onLeftPress={() => { this.props.navigation.goBack() }}>
        <View style={styles.container}>
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
  }
}

export default connect(mapStateToProps)(Search)