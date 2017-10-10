import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

export const isLandscape = (dimension) => {
  if (dimension) return d.window.width > d.window.height;
  return width > height;
};

export const getStatusbarHeight = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }
  
  if ( isIphoneX() ) {
    return 44;
  }
  return 20;
}