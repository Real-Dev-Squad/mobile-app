import React from 'react';
import { render } from '@testing-library/react-native';
import GoalScreen from '../../src/screens/GoalScreen/GoalScreen';
import { NavigationContainer } from '@react-navigation/native';

// test('renders GoalScreen correctly', () => {
//   const { getByTestId } = render(<GoalScreen />);

//   // Verify that the TodoComponent is rendered
//   const todoComponent = getByTestId('todo-component');
//   expect(todoComponent).toBeTruthy();

//   // TODO: Add assertions for ShortGoalsComponent and LongGoalsComponent once they are implemented.
// });

describe('GoalScreen', () => {
  test('renders GoalScreen correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <GoalScreen />
      </NavigationContainer>,
    );
    const todoComponent = getByTestId('todoComponent');
    expect(todoComponent).toBeTruthy();
  });
});
