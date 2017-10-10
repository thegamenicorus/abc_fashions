import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  storeDetailContainer: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 10
  },
  itemTextContainer: {
    padding: 10
  },
  logoContainer: {
    borderRadius: 50,
  },
  logo: {
    width: 100, 
    height: 100,
    borderRadius: 50,
  },
  title: {
    ...Fonts.style.h5,
    color: Colors.link
  },
  textSmall: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.medium
  },
  textDescription: {
    marginTop: 10, 
    color:'gray',
  },
  itemsContainer: {
    flex:1,
    marginTop: 10,
    backgroundColor: Colors.table,
  },
  header: {
    flex:1,
    position: 'absolute',
    top: Metrics.statusBarHeight,
    left: 0,
    right: 0,
    borderWidth:1
  },
  stickyHeader: {
    marginTop: Metrics.statusBarHeight,
  },
  textNormal: {
    ...Fonts.style.normal
  }
})
