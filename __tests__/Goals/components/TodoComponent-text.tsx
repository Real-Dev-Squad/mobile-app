import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoComponent from '../../../src/components/ToDoComponent/TodoComponent';
import { RootStackParamList } from '../../../src/screens/GoalScreen/GoalScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
jest.useFakeTimers();

describe('TodoComponent', () => {
  const navigation: NativeStackNavigationProp<
    RootStackParamList,
    'GoalsScreen'
  > = {
    navigate: jest.fn(),
  };

  test('renders title correctly', () => {
    const { getByText } = render(<TodoComponent navigation={navigation} />);
    const titleElement = getByText("To Do's");
    expect(titleElement).toBeTruthy();
  });

  test('renders "Add" button correctly', () => {
    const { getByText } = render(<TodoComponent navigation={navigation} />);
    const addButton = getByText('Add');
    expect(addButton).toBeTruthy();
  });

  test('calls navigationProp.navigate when "Add" button is pressed', () => {
    const { getByText } = render(<TodoComponent navigation={navigation} />);
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    expect(navigation.navigate).toHaveBeenCalledWith('CreatingGoalsSceen');
  });
});
