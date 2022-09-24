import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ShortGoalsComponent from '../src/components/ShortGoalsComponent/ShortGoalsComponent';
import AuthScreen from '../src/screens/AuthScreen/AuthScreen';
import Strings from '../src/i18n/en';
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
    maxLength: 4,
    setCode: () => {},
    closeModal: () => {},
  };
  const data = [
    { code: '', disabled: true },
    { code: '12', disabled: true },
    { code: '1234', disabled: false },
  ];
  data.forEach(({ code, disabled }) => {
    const { getByTestId } = render(<OtpModal {...props} code={code} />);
    expect(getByTestId('submitOtpModal').props).toHaveProperty(
      'accessibilityState',
      { disabled },
    );
  });
});
