import AsyncStorage from '@react-native-community/async-storage';

export default {
  set: (key, val) => AsyncStorage.setItem(key, val),
  get: key => AsyncStorage.getItem(key),
  remove: key => AsyncStorage.removeItem(key),
};
