import App from '../App';
import renderer from 'react-test-renderer';
import { AsyncStorage as storage } from 'react-native';

it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue');
  const value = await storage.getItem('myKey');
  expect(value).toBe('myValue');
});

it('renders correctly', async () => {
  renderer.create(<App />);
});
