import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react-native';
import ConnectionScreen from '../src/screens/ConnectionScreen/ConnectionScreen';

describe('ConnectionScreen component', () => {
  it('renders properly and triggers retry function on button press', () => {
    const retryConnectMock = jest.fn();
    render(<ConnectionScreen retryConnect={retryConnectMock} />);
    expect(screen.getByText('Retry')).toBeTruthy();
    fireEvent.press(screen.getByText('Retry'));
    expect(retryConnectMock).toHaveBeenCalledTimes(1);
  });
});
