import React from 'react';
import { render } from '@testing-library/react-native';
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
});
