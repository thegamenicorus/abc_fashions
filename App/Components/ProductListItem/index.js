import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {getImageSizeFitWidth} from '../../Utils/ImageHeightCalculator';
import styles from '../Styles/ProductListItemStyles';

const COLORS = [
  '#FFDDDD',
  '#B9E3AE',
  '#A3E7D8',
  '#A4C8F0',
  '#D0B3E1',
  '#FDB4BF',
  '#B3B3D9',
  '#CBAB8D'
];

class ListItem extends Component {
  state = {
    imageHeight: 200,
    loading: true
  }

  render() {
    const { item } = this.props;
    if (!this.state.imageHeight) 
      return null;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(item.productId)}>
      <View style={[styles.card]}>      
        <View style={[styles.image, {backgroundColor: item.color, height: item.imageHeight}]}>  
          <Image
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: item.imageUrl }}
            style={[styles.image, {height: item.imageHeight}]}
          />
        </View>

        <View
          style={[{
            flex: 1,
            padding: 5,
            backgroundColor: 'white',
            borderRadius: 3,
          }
        ]}>
          <Text
            style={styles.storeName}
            numberOfLines={1}
          >
            {item.storeName}
          </Text>
          
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.PropTypes = {
  item: PropTypes.object.isRequired,
  onpress: PropTypes.func.isRequired,
}

export default ListItem;