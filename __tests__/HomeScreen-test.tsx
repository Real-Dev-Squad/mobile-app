/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeScreen from '../src/screens/HomeScreen/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {render, fireEvent} from '@testing-library/react-native';

import Strings from '../src/i18n/en';

it('renders correctly', () => {
  renderer.create(<HomeScreen />);
});

it('snapshot should match', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('If a user clicks on Mark Yourself As OOO', () => {
  const {getByText, getAllByText} = render(<HomeScreen />);

  fireEvent.press(getByText(Strings.OOOBtn1_Text));

  const renderedElements = getAllByText(Strings.OOOStatus_Text);

  expect(renderedElements).toHaveLength(1);
});

test('If a user clicks on Mark Yourself Active Again', () => {
  const {getByText, getAllByText} = render(<HomeScreen />);

  fireEvent.press(getByText(Strings.OOOBtn1_Text));

  fireEvent.press(getByText(Strings.OOOBtn2_Text));

  const renderedElements = getAllByText(Strings.Active_Text);

  expect(renderedElements).toHaveLength(1);
});

test('If a user clicks on change status to Idle', () => {
  const {getByText, getAllByText} = render(<HomeScreen />);

  fireEvent.press(getByText(Strings.OOOBtn1_Text));

  const renderedElements = getAllByText(Strings.OOOStatus_Text);

  expect(renderedElements).toHaveLength(1);
});

test('If a user clicks on change status to Active', () => {
  const {getByText, getAllByText} = render(<HomeScreen />);

  fireEvent.press(getByText(Strings.OOOBtn1_Text));

  const renderedElements = getAllByText(Strings.OOOStatus_Text);

  expect(renderedElements).toHaveLength(1);
});
