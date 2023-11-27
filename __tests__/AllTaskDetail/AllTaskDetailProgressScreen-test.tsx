import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AllTaskDetailProgessScreen from '../../src/screens/ProfileScreen/DetailsScreen/AllTaskDetailProgressScreen';

it.skip('AllTaskDetailProgessScreen is Rendered', () => {
  render(<AllTaskDetailProgessScreen route={undefined} />);
  screen.getByText(/Task Updates/i);
});

it.skip('', () => {
  const blocked = 'dee';
  const completed = '';
  const planned = '';

  React.useState = jest
    .fn()
    .mockRejectedValueOnce([blocked])
    .mockRejectedValueOnce([completed])
    .mockRejectedValueOnce([planned]);

  render(<AllTaskDetailProgessScreen route={undefined} />);

  fireEvent.press(screen.getByText('Check'));

  expect(screen.getByText(/Submit/i)).toHaveBeenCalledTimes(0);
});
