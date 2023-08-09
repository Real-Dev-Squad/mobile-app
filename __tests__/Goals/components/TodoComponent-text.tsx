import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoComponent from '../../../src/components/ToDoComponent/TodoComponent';

describe('TodoComponent', () => {
  test.skip('renders title correctly', () => {
    const navigationProp = { navigate: jest.fn() };
    const { getByText } = render(
      <TodoComponent navigationProp={navigationProp} />,
    );
    const titleElement = getByText("To Do's");
    expect(titleElement).toBeTruthy();
  });

  test.skip('renders "Add" button correctly', () => {
    const navigationProp = { navigate: jest.fn() };
    const { getByText } = render(
      <TodoComponent navigationProp={navigationProp} />,
    );
    const addButton = getByText('Add');
    expect(addButton).toBeTruthy();
  });

  test.skip('calls navigationProp.navigate when "Add" button is pressed', () => {
    const navigationProp = { navigate: jest.fn() };
    const { getByText } = render(
      <TodoComponent navigationProp={navigationProp} />,
    );
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    expect(navigationProp.navigate).toHaveBeenCalledWith('CreatingGoals');
  });
});
