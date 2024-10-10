import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoComponent from '../../../src/components/ToDoComponent/TodoComponent';
import { NavigationContainer } from '@react-navigation/native';

describe('TodoComponent', () => {
  test('renders title correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <TodoComponent />
      </NavigationContainer>,
    );
    const titleElement = getByText("To Do's");
    expect(titleElement).toBeTruthy();
  });

  test('renders "Add" button correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <TodoComponent />
      </NavigationContainer>,
    );
    const addButton = getByText('Add');
    expect(addButton).toBeTruthy();
  });

  test.skip('calls navigationProp.navigate when "Add" button is pressed', async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate,
      });
    const { getByTestId } = render(
      <NavigationContainer>
        <TodoComponent />
      </NavigationContainer>,
    );
    const addButton = getByTestId('addButton');
    fireEvent.press(addButton);
    expect(navigate).toHaveBeenCalledWith('CreatingGoals');
  });
});
