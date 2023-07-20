import React from 'react';
import { render } from '@testing-library/react-native';
import {
  GoalScreen,
  GoalScreenProp,
  RootStackParamList,
} from '../../src/screens/GoalScreen/GoalScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

test('renders GoalScreen correctly', () => {
  const navigation: NativeStackNavigationProp<
    RootStackParamList,
    'GoalsScreen',
    undefined
  > = {
    navigate: jest.fn(),
  };
  const goalScreenProp: GoalScreenProp = {
    route: { key: '', name: 'GoalsScreen' },
    navigation: navigation,
  };
  const { getByTestId } = render(
    <GoalScreen
      navigation={goalScreenProp.navigation}
      route={goalScreenProp.route}
    />,
  );

  // Verify that the TodoComponent is rendered
  const todoComponent = getByTestId('todo-component');
  expect(todoComponent).toBeTruthy();

  // TODO: Add assertions for ShortGoalsComponent and LongGoalsComponent once they are implemented.
});
