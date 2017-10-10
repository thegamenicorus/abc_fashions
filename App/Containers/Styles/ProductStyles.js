import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 5
  },
  button: {
    flex: 1, 
    marginTop: 10, 
    backgroundColor: Colors.app, 
    borderRadius: 5, 
    padding: 10, 
    alignItems: 'center'
  },
  leftButton: {
    width: 50,
    paddingLeft: 15,
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
    marginBottom: 5,
  },
  description: {
    ...Fonts.style.normal,
    marginTop: 8,
    color: Colors.charcoal
  },
  table: {
    marginTop: 8,
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
    borderWidth:2,
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
    padding: 8,
  },
  tableTitle: {
    ...Fonts.style.normal,
  },
  tableDescription: {
    ...Fonts.style.normal,
    color: Colors.charcoal
  },
  tableFullHeight: {
    height: '100%',
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
