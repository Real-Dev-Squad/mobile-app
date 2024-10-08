import { jest } from '@jest/globals';
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-native-firebase/app', () => {
  return {
    firebase: {
      app: jest.fn(() => ({
        initializeApp: jest.fn(),
      })),
      messaging: jest.fn(() => ({
        getToken: jest.fn(),
      })),
    },
  };
});
