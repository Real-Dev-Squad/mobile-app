/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<HomeScreen />);
});

it('snapshot should match', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
