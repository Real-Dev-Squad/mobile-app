import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../App';
import TabNavigation from '../src/navigations/TabNavigation/TabNavigation';

describe('TabNavigation', () => {
  it('renders all tabs correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TabNavigation />
      </Provider>,
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Calendar')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('navigates to Calendar screen by default', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TabNavigation />
      </Provider>,
    );
    const calendar = getByTestId('calendar');

    expect(calendar).toBeTruthy();
  });
});
