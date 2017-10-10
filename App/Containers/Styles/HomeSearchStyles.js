import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  itemsContainer: {
    flex:1,
    marginTop: 10,
  },
})
