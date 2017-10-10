import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    height: Metrics.screenHeight - Metrics.statusBarHeight - 70,
  },
  cardContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.table
  },
  input: {
    ...Fonts.style.normal
  },
  text: {
    ...Fonts.style.normal,
    paddingLeft: 10,
    fontSize: Fonts.size.medium,
    color: 'gray',
  },
  button: {
    flex: 1,
    marginTop: 10, 
    backgroundColor: Colors.app, 
    borderRadius: 5, 
    padding: 10, 
    alignItems: 'center',
    marginHorizontal: 10,
  },
  butonText: {
    ...Fonts.style.normal,
    color: Colors.background
  },
  title: {
    fontSize: Fonts.size.h6,
    marginTop: 8,
    color: Colors.charcoal
  },
  description: {
    ...Fonts.style.normal,
    marginTop: 8,
    color: Colors.charcoal
  },
})
