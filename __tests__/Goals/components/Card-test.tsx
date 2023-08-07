import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../../src/components/ToDoComponent/Card';

describe('Card', () => {
  const item = {
    id: 1,
    task: 'Sample Task',
    isread: false,
  };

  test.skip('renders task correctly', () => {
    const { getByText } = render(
      <Card
        item={item}
        posStyle="relative"
        changecard={() => {}}
        removeCard={() => {}}
        disabled={false}
        setDisabled={() => {}}
      />,
    );
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

  test.skip('marks the card as done and shows a toast message when "Mark Done" button is pressed', () => {
    const { getByTestId, getByText } = render(
      <Card
        item={item}
        posStyle="relative"
        changecard={() => {}}
        removeCard={() => {}}
        disabled={false}
        setDisabled={() => {}}
      />,
    );
    const markDoneButton = getByTestId('doneBtn');
    fireEvent.press(markDoneButton);
    const toastText1 = getByText('Marked as done');
    const toastText2 = getByText('Click here to mark undone');
    expect(toastText1).toBeTruthy();
    expect(toastText2).toBeTruthy();
  });
});
