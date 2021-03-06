import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  table: {
    marginTop: 8,
    paddingHorizontal: 10,
  },
  tableLeftTop: {
    borderTopLeftRadius: 5,
    borderTopWidth: 2,
  },
  tableRightTop: {
    borderTopRightRadius: 5,
  },
  tableLeftBottom: {
    borderBottomLeftRadius: 5,
    borderWidth:1,
    borderBottomColor: Colors.table,
  },
  tableRightBottom: {
    borderTopWidth: 0,
    borderBottomRightRadius: 5,
  },
  tableMiddle: {
    borderTopWidth: 0
  },
  tableTitleContainer: {
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: Colors.table,
    borderWidth: 1,
    borderColor: Colors.table,
    borderBottomColor: 'white',
  },
  tableDescriptionContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.table,
    padding: Platform.OS==='ios'?8:6,
  },
  tableTitle: {
    ...Fonts.style.normal,
  },
  tableDescription: {
    ...Fonts.style.normal,
    color: Colors.charcoal,
    padding: 0,
  },
})
