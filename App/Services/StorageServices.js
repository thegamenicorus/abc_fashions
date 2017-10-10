import { AsyncStorage } from 'react-native';

export default {
  get: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  set: async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  remove: async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
} 