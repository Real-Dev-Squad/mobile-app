import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (item: string) => {
  console.log('getData', item);
  return AsyncStorage.getItem(item)
    .then((res) => {
      return res ? JSON.parse(res) : '';
    })
    .catch((err) => console.log(err));
};
