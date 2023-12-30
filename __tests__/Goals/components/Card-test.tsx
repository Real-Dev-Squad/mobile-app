import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../../src/components/ToDoComponent/Card';

jest.mock('react-native-gesture-handler', () => {});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;

  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
  };
});
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;

  return {
    useSharedValue: jest.fn(),
    useAnimatedGestureHandler: jest.fn(),
    useAnimatedStyle: jest.fn(),
    View: View,
    Easing: {},
  };
});

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

describe('Card', () => {
  const item = {
    id: 1,
    task: 'Sample Task',
    isread: false,
  };

  const mockProps = {
    item: item,
    posStyle: 'relative',
    changecard: jest.fn(),
    removeCard: jest.fn(),
    disabled: false,
    setDisabled: jest.fn(),
    title: 'Sample Task',
    assigned_by: 'Anish',
  };

  test('renders task correctly', () => {
    const { getByText } = render(<Card {...mockProps} />);
    const taskElement = getByText('Sample Task');
    expect(taskElement).toBeTruthy();
  });

  test.skip('calls changecard function when pan gesture ends with translateY > 100', () => {
    const changecardMock = jest.fn();
    const { getByTestId } = render(
      <Card
        item={item}
        posStyle="relative"
        changecard={changecardMock}
        removeCard={() => {}}
        disabled={false}
        setDisabled={() => {}}
      />,
    );
    const animatedView = getByTestId('animated-view');
    fireEvent(animatedView, 'panEnd', { translationY: 150 });
    expect(changecardMock).toHaveBeenCalledWith(1);
  });

  test('marks the card as done and shows a toast message when "Mark Done" button is pressed', async () => {
    const { getByTestId } = render(<Card {...mockProps} />);

    const markDoneButton = getByTestId('doneBtn');
    fireEvent.press(markDoneButton);

    expect(mockProps.setDisabled).toHaveBeenCalled();

    expect(require('react-native-toast-message').show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Marked as done',
      text2: 'Click here to mark undone',
      position: 'bottom',
      bottomOffset: 80,
      onPress: expect.any(Function),
    });
    // const toastText1 = await findByText('Marked as done');
    // const toastText2 = await findByText('Click here to mark undone');
    // expect(toastText1).toBeTruthy();
    // expect(toastText2).toBeTruthy();
  });
});
