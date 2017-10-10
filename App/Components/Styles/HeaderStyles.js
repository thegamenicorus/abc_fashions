import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex:1 ,
    backgroundColor: 'rgba(255,255,255, 0.98)'
  },
  leftButton: {
    minWidth: 50,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftButtonText: {
    paddingLeft: 5,
    color: Colors.app,
  },
  rightButton: {
    minWidth: 50,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightButtonText: {
    paddingRight: 5,
    color: Colors.app,
  },
  title: {
    ...Fonts.style.normal
  },
})
