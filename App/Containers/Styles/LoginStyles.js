import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.type.base,
    fontSize: 30,
    color: '#FFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    paddingVertical: 10,
  },
  input: {
    fontFamily: Fonts.type.base,
    width: 250,
    paddingVertical: Platform.OS==='ios'?5:0,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    color: '#333',
    backgroundColor: '#FFF',
    alignItems:'center'
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.app,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
})
