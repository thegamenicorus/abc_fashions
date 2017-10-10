import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  empyCartContainer: {
    flex: 1,
    height: Metrics.screenHeight - Metrics.statusBarHeight - 70,
  },
  cartContainer: {
    flex: 1, 
    padding: 10
  },
  totalContainer: {
    justifyContent: 'space-between'
  },
  button: {
    flex: 1, 
    marginTop: 10, 
    backgroundColor: Colors.app, 
    borderRadius: 5, 
    padding: 10, 
    alignItems: 'center'
  },
  card: {
    flex: 1,
    borderRadius: 5,
  },
  centerVerical: {
    flex:1, 
    justifyContent: 'center',
  },
  title: {
    ...Fonts.style.h5
  },
  price: {
    ...Fonts.style.h5,
    color: Colors.app,
  },
  totalPrice: {
    ...Fonts.style.h5,
    color: Colors.app,
    marginLeft: 5,
  },
  description: {
    ...Fonts.style.normal,
    marginTop: 8,
    color: Colors.charcoal
  },
  textSmall: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.medium
  },
  link: {
    color: Colors.link
  },
  butonText: {
    ...Fonts.style.normal,
    color: Colors.background
  }
})
