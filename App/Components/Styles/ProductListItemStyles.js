import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  card: {
    margin: 5,
    flex: 1,
    maxWidth: Metrics.screenWidth / 2.12,
    minWidth: Metrics.screenWidth / 2.12,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      x: 0,
      y: 0
    },
    shadowRadius: 5,
    borderColor: "#fff"
  },
  image: {
    borderRadius: 3,
  },
  itemName: {
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: Fonts.base
  },
  storeName: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: Fonts.base,
    fontSize: 12,
    color: 'gray'
  },
  price: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: Fonts.base,
    fontSize: 16,
    color: 'gray'
  }
})
