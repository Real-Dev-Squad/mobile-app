import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (item: string) => {
  return AsyncStorage.getItem(item)
    .then((res) => {
      return res ? JSON.parse(res) : '';
    })
    .catch((err) => console.log(err));
};

export const removeData = async (item: string) => {
  return AsyncStorage.removeItem(item)
    .then(() => {})
    .catch((err) => console.log(err));
};
