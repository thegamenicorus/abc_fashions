import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  searchInput: {
    backgroundColor: '#efefef'
  },
  animatedHeader: {
    padding: 5,
  },
  fetching: {
    flex: 1, 
    marginTop: 70
  }
})
