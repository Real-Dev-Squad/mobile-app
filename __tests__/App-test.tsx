import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

async function asyncOperationOnAsyncStorage() {
  await AsyncStorage.setItem('myKey', '1');
}

it('checks if Async Storage is used', async () => {
  await asyncOperationOnAsyncStorage();
  expect(AsyncStorage.setItem).toBeCalledWith('myKey', '1');
  const res = await AsyncStorage.getItem('myKey');
  expect(res).toMatch('1');
});

it('renders correctly', async () => {
  renderer.create(<App />);
});
