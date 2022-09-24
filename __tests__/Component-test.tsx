import React from "react";
import {fireEvent, render} from "@testing-library/react-native"
import ShortGoalsComponent from "../src/components/ShortGoalsComponent/ShortGoalsComponent";
import DurationDropdown from '../src/components/CreateGoalForm/Dropdown';
import FloatingButton from '../src/components/FloatingButton';

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

// Create Goal component test


test('roadmap type does not exist on initial render', () => {
    const {queryByTestId} = render(<DurationDropdown/>);
    expect(queryByTestId('longTermRoadmap')).toBeNull();
})

 test('roadmap type exists when use select duration as long term', ()=>{
    const { queryByTestId ,getByTestId} = render(<DurationDropdown/>);
    fireEvent.press(getByTestId('roadmapType'));
    expect(queryByTestId('shortTermInput')).toBeNull();
    expect(getByTestId('longTermRoadmap').props.value).toStrictEqual('long');
 })

 // Floating Button test

 test('floating actions exists when we click floating button', ()=> {
    const {queryByTestId, getByTestId} = render(<FloatingButton/>);
    fireEvent.press(getByTestId('floatingButton'))
    expect(queryByTestId('floatingButton')).toBeTruthy();
    expect(getByTestId('floatingButton').props.style).toStrictEqual({marginTop: '120%'})
 })