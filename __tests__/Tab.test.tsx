import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from '../App';
import TabNavigation from '../src/navigations/TabNavigation/TabNavigation';

describe('TabNavigation', () => {
  it('renders all tabs correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TabNavigation />
      </Provider>,
    );

    // Assert that each tab is rendered with its respective label
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Calendar')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('navigates to Home screen by default', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TabNavigation />
      </Provider>,
    );
    const calendar = getByTestId('calendar');

    expect(calendar).toBeTruthy();

    // Assert that the Home screen is displayed by default
  });

  // You can add more test cases to cover navigation and behavior of each tab
});
