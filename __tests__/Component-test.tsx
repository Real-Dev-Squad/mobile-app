import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ShortGoalsComponent from '../src/components/ShortGoalsComponent/ShortGoalsComponent';

// Short Term Goals component test

test('flatlist does not exist on initial render', () => {
  const { queryByTestId, getByTestId } = render(<ShortGoalsComponent />);
  expect(queryByTestId('flatlist')).toBeNull();
  expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({
    resizeMode: 'cover',
    width: 30,
    height: 30,
  });
});

test('flatlist exists when we click on the arrow button', () => {
  const { queryByTestId, getByTestId } = render(<ShortGoalsComponent />);
  fireEvent.press(getByTestId('arrowBtn'));
  expect(queryByTestId('flatlist')).toBeTruthy();
  expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({
    resizeMode: 'cover',
    width: 30,
    height: 30,
    transform: [{ rotate: '90deg' }],
  });
});
