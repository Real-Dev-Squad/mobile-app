import React from "react";
import {fireEvent, render} from "@testing-library/react-native"
import ShortGoalsComponent from "../src/components/ShortGoalsComponent/ShortGoalsComponent";
import Card from "../src/components/ToDoComponent/Card"
import Data from "../src/components/ToDoComponent/Data"
import 'react-native-gesture-handler'

// Short Term Goals component test

test('flatlist does not exist on initial render', () => {
    const  {queryByTestId, getByTestId } = render(<ShortGoalsComponent/>);	
    expect(queryByTestId('flatlist')).toBeNull();
    expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({resizeMode: 'cover', width: 30, height: 30,})
})

test('flatlist exists when we click on the arrow button', () => {
    const {queryByTestId, getByTestId} = render(<ShortGoalsComponent/>)
    fireEvent.press(getByTestId('arrowBtn'))
    expect(queryByTestId('flatlist')).toBeTruthy();
    expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({resizeMode: 'cover', width: 30, height: 30, transform: [{ rotate: '90deg' }],})
})

// ToDoComponent Tests

jest.mock('react-native-gesture-handler', () => {})

jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native').View;
    
    return {
        GestureHandlerRootView: View,
        PanGestureHandler: View,
    }
});
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock") );
jest.mock('react-native-reanimated', () => {
    const View = require('react-native').View;
  
    return {
      useSharedValue: jest.fn(),
      useAnimatedGestureHandler: jest.fn(),
      useAnimatedStyle: jest.fn(),
      View: View,
    };
  });

test('setTimeout called which calls other two functions remove and changecard', () => {
    const {getByTestId,} = render(
      <Card 
        item={Data[0]}
        posStyle='relative'
        changecard={() => {}}
        removeCard={() => {}}
      />
    )

    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout');
    fireEvent.press(getByTestId('doneBtn'))
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
})