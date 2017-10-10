import React, { Component, PureComponent } from 'react';
import { StyleSheet, Animated, Keyboard, View, 
  Text, TouchableOpacity, Image, ActivityIndicator,
  Platform
} from 'react-native';
import MasonryList from '@appandflow/masonry-list';
import Search from 'react-native-search-box';
import { connect } from 'react-redux'

import DataActions from '../../Redux/DataRedux'
import { getImageSizeFitWidth } from '../../Utils/ImageHeightCalculator'
import Header from '../../Components/SearchableHeader'
import styles from '../Styles/HomeStyles'
import {Metrics, Colors} from '../../Themes';

//import products from '../../Data/Mock/products.json';
//import stores from '../../Data/Mock/stores.json';
import ListItem from '../../Components/ProductListItem'

const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedMasonryList = Animated.createAnimatedComponent(MasonryList);
const ListSwipeDistanceAnimated = 100;
const headerHeight = Metrics.statusBarHeight + 50;

class Home extends Component {
  state = { 
    headerAnimation: new Animated.Value(0.99),
    listAnimation: new Animated.Value(headerHeight),
    headerAnimating: false,
    listAnimating: false,
    isRefreshing: false,
    headerVisible: true,
    headerHeight,
    listExpanded: true,
    productListItems: this.props.products || [],
    loading: true,
  };

  async componentWillReceiveProps(nextProps) {
    //calculate image width for masonry list
    const {products, stores} = nextProps;
    
    this.setState({ productListItems: products, loading: false })
  }

  _onScroll = (event) => {
    const { headerAnimating, headerVisible, listAnimating, listExpanded } = this.state;
    const currentOffset = event.nativeEvent.contentOffset.y
    // Ignore scroll events outside the scrollview
    if (currentOffset < 0 || currentOffset > (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height)) {
      return
    }
    
    const distance = Math.abs(this.offset - currentOffset);
    const isPullDownCloseToTop = ( currentOffset < ListSwipeDistanceAnimated && currentOffset <= 0 );
    const isPullUpCloseToTop = ( currentOffset < ListSwipeDistanceAnimated && currentOffset > 0 );

    if ( 
      ( distance > ListSwipeDistanceAnimated || isPullDownCloseToTop || isPullUpCloseToTop)
      && ( this.isSwipeListUp(currentOffset) || this.isSwipeListDown(currentOffset) )
      && !headerAnimating
    ) {
      if(isPullDownCloseToTop || this.isSwipeListDown(currentOffset))
        this.animationHeader(true)
      else if(isPullUpCloseToTop || this.isSwipeListUp(currentOffset))
        this.animationHeader(false)
      Keyboard.dismiss()
    }
    
    if (currentOffset < ListSwipeDistanceAnimated && !listAnimating){
      console.log(currentOffset)
      if (!listExpanded && currentOffset <= 10) {
        this.animationList(true);
      }
      else if(listExpanded && currentOffset > 10) {
        this.animationList(false);
      }
    }
    else if(listExpanded && !listAnimating) {
      this.animationList(false)
    }
  }

  animationHeader = (isVisible) => {
    this.setState({ headerAnimating: true })
    Animated.spring(this.state.headerAnimation, {      
      toValue: isVisible ? 0.99 : 0,
      useNativeDriver: true
    }).start( (animated) => {
      if (animated.finished) {
        this.setState((state) => ({ headerVisible: isVisible, headerAnimating: false }))
      }
    })
  }

  animationList = (isExpand) => {
    this.setState({ listAnimating: true })
    Animated.timing(this.state.listAnimation, {      
      toValue: isExpand ? this.state.headerHeight : Metrics.statusBarHeight,
      duration: 100,
      useNativeDriver: true
    }).start( (animated) => {
      if (animated.finished) {
        this.setState((state) => ({ listExpanded: isExpand, listAnimating: false }))
      }
    })
  }

  isSwipeListUp = ( currentOffset ) => {
    return (this.state.headerVisible && currentOffset > this.offset)
  }

  isSwipeListDown = ( currentOffset ) => {
    return (!this.state.headerVisible && currentOffset < this.offset)
  }
  
  _refreshRequest = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);
  };

  onProductPress = (productId) => {
    this.props.navigation.navigate('Product', { productId });
  }

  _onScrollBeginDrag = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    this.offset = currentOffset
  }

  onSearch = (keyword) => {
    return new Promise((resolve, reject) => {
      if(keyword.length > 0) {
        this.props.navigation.navigate('Search', { keyword });
      }
      resolve();
    });
  }

  renderProductList = () => {    
    if(this.props.fetching )
      return (
        <View style={styles.fetching}>
          <ActivityIndicator size='small' color={Colors.charcoal}/>
        </View>
      );
    else if(this.state.productListItems.length === 0) {
      return (
        <View style={styles.fetching}>
          <Text> Empty </Text>
        </View>
      );
    }
    return (
      <AnimatedMasonryList
        ref='list'
        style={{flex: 1, transform: [{translateY: this.state.listAnimation}]}}
        onRefresh={this._refreshRequest}
        refreshing={this.state.isRefreshing}
        data={this.state.productListItems}
        renderItem={({ item }) => <ListItem item={item} onPress={this.onProductPress} />}
        getHeightForItem={({ item }) => 10}
        numColumns={2}
        keyExtractor={item => item.productId}
        onScroll={this._onScroll}
        onScrollBeginDrag={this._onScrollBeginDrag}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 70}}
      />
    )
  }

  render() {
    const headerHeightInterpolate = this.state.headerAnimation.interpolate({
      inputRange: [0, 0.99],
      outputRange: [this.state.headerHeight * -1, 0]
    })

    const headerAnimatedStyle = {
      transform: [{translateY : headerHeightInterpolate}],
      opacity: this.state.headerAnimation,
    }
    
    return (
      <View style={[styles.mainContainer]}>
        <AnimatedHeader style={[styles.animatedHeader, headerAnimatedStyle]}>
          <Search
            ref="search_box"
            backgroundColor='white'
            titleCancelColor='gray'
            onSearch={this.onSearch}
            inputStyle={styles.searchInput}
          />
        </AnimatedHeader>
        {this.renderProductList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return { 
    fetching: data.fetching,
    products: data.products,
    stores: data.stores
  }
}

export default connect(mapStateToProps)(Home)