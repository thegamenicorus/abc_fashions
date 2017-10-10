import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex:1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      x: 0,
      y: 0
    },
    shadowRadius: 5,
    borderColor: "#fff"
  },
  imageContainer: {
    borderRadius: 3,
  },
  image: {
    borderRadius: 3,
    width: 75,
    height: 75,
  },
  text: {
    ...Fonts.style.description,
    fontSize: 16
  },
  textSmall: {
    ...Fonts.style.description,
    fontSize: Fonts.size.medium
  },
})