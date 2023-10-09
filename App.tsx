import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
import Index from './src/Index';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './src/reducers';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './src/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export const store = compose(applyMiddleware(...middleware))(createStore)(
  reducers,
);
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
