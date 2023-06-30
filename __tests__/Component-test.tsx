import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ShortGoalsComponent from '../src/components/ShortGoalsComponent/ShortGoalsComponent';
import Card from '../src/components/ToDoComponent/Card';
import 'react-native-gesture-handler';
import DurationDropdown from '../src/components/CreateGoalForm/Dropdown';
import FloatingButton from '../src/components/FloatingButton';
import Strings from '../src/i18n/en';
import AuthScreen from '../src/screens/AuthScreen/AuthScreen';
import { OtpModal } from '../src/screens/AuthScreen/OtpModal';

// Short Term Goals component test

test('flatlist does not exist on initial render', () => {
  const { queryByTestId, getByTestId } = render(<ShortGoalsComponent />);
  expect(queryByTestId('flatlist')).toBeNull();
  expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({
    resizeMode: 'cover',
    width: 30,
    height: 30,
  });
});

test('flatlist exists when we click on the arrow button', () => {
  const { queryByTestId, getByTestId } = render(<ShortGoalsComponent />);
  fireEvent.press(getByTestId('arrowBtn'));
  expect(queryByTestId('flatlist')).toBeTruthy();
  expect(getByTestId('arrowBtnIcon').props.style).toStrictEqual({
    resizeMode: 'cover',
    width: 30,
    height: 30,
    transform: [{ rotate: '90deg' }],
  });
});

// Create Goal component test

test('roadmap type does not exist on initial render', () => {
  const { queryByTestId } = render(<DurationDropdown />);
  expect(queryByTestId('longTermRoadmap')).toBeNull();
});

test('roadmap type exists when use select duration as long term and stays undefined initally', () => {
  const { getByTestId } = render(<DurationDropdown />);
  fireEvent.press(getByTestId('roadmapType'));
  expect(getByTestId('roadmapType').props.value).toStrictEqual(undefined);
});

// Floating Button test

test('floating actions exists when we click floating button', () => {
  const { queryByTestId, getByTestId } = render(<FloatingButton />);
  fireEvent.press(getByTestId('floatingButton'));
  expect(queryByTestId('floatingButton')).toBeTruthy();
  expect(getByTestId('floatingButton').props.style).toStrictEqual({
    marginTop: '120%',
  });
});

// ToDoComponent Tests

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
    useAnimatedGestureHandler: jest.fn(),
    useAnimatedStyle: jest.fn(),
    View: View,
    Easing: {},
  };
});

const DATA = {
  title: 'Task1',
  assigned_by: 'admin',
};

test('setTimeout called which calls other two functions remove and changecard', () => {
  const { getByTestId } = render(
    <Card
      item={DATA}
      posStyle="relative"
      changecard={() => {}}
      removeCard={() => {}}
      disabled={false}
      setDisabled={() => {}}
    />,
  );

  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  fireEvent.press(getByTestId('doneBtn'));
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
});

//Sign In Withh Web and OtpModal Component Test
test('Check is sign in with web and otpmodal is rendering', () => {
  const { getByText, queryByTestId } = render(<AuthScreen />);
  const SignInWithWeb = getByText(Strings.SIGN_IN_WITH_WEB);
  expect(SignInWithWeb).toBeTruthy();
  expect(queryByTestId('otpModal')).toBeNull();
  fireEvent.press(SignInWithWeb);
  expect(queryByTestId('otpModal')).toBeTruthy();
});

test('Check otpmodal submit to be disabled and enabled', () => {
  const props = {
    title: Strings.ENTER_4_DIGIT_OTP,
    testId: 'otpModal',
    visible: true,
    code: '',
    setCode: () => {},
    closeModal: () => {},
  };
  const data = [
    { code: '', disabled: true },
    { code: '12', disabled: true },
    { code: '1234', disabled: false },
  ];
  data.forEach(({ code, disabled }) => {
    const { getByTestId } = render(
      <OtpModal maxLength={4} {...props} code={code} />,
    );
    expect(getByTestId('submitOtpModal').props).toHaveProperty(
      'accessibilityState',
      { disabled },
    );
  });
});
