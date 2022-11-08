import {
  getUserData,
  isValidTextInput,
  updateMarkYourSelfAs_,
  updateStatus,
} from '../src/screens/AuthScreen/Util';
import { urls } from '../src/constants/appConstant/url';
import Strings from '../src/i18n/en';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUserData util', () => {
  const mockUserData = {
    id: '123abc',
    github_display_name: 'Jane Doe',
    picture: { url: 'https://via.placeholder.com/600/d32776' },
    status: Strings.OOOStatus_Text,
  };

  test('when url passed !== redirect url return null', async () => {
    const res = await getUserData('https://www.example.net/');
    expect(res).toEqual(null);
  });

  test('when redirect url is passed to getUserData && axios call is ok return user name & profileUrl', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockUserData });
    const res = await getUserData(urls.REDIRECT_URL);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${urls.GET_USERS_DATA}`, {
      headers: { cookie: '' },
    });
    expect(res).toEqual({
      id: '123abc',
      name: 'Jane Doe',
      profileUrl: 'https://via.placeholder.com/600/d32776',
      status: Strings.OOOStatus_Text,
    });
  });

  test('when redirect url is passed to getUserData && axios call fails return null', async () => {
    mockedAxios.get.mockRejectedValue('500: server error');
    try {
      await getUserData(urls.REDIRECT_URL);
    } catch (err) {
      expect(err).toEqual('500: server error');
    }
  });
});

describe('updateStatus util', () => {
  test('pass arg undefined receive throw error', async () => {
    mockedAxios.patch.mockRejectedValue(
      // eslint-disable-next-line quotes
      `TypeError: Cannot read properties of undefined (reading 'protocol')`,
    );
    try {
      /* @ts-expect-error */
      await updateStatus(undefined);
    } catch (err) {
      expect(err).toEqual(
        // eslint-disable-next-line quotes
        `TypeError: Cannot read properties of undefined (reading 'protocol')`,
      );
    }
  });

  test('passes url to get changed status', async () => {
    mockedAxios.patch.mockResolvedValue({
      config: { data: { status: Strings.Active_Text } },
    });

    try {
      const res = await updateStatus(Strings.Active_Text);
      expect(res).toEqual(Strings.Active_Text);
    } catch (err) {}
  });

  test('passes url to receive thrown error', async () => {
    mockedAxios.patch.mockRejectedValue('500: internal server error');

    try {
      await updateStatus(Strings.Active_Text);
    } catch (err) {
      expect(err).toEqual('500: internal server error');
    }
  });
});

describe('updateMarkYourSelfAs_ util', () => {
  test('pass arg undefined receive throw error', async () => {
    mockedAxios.patch.mockRejectedValue(
      // eslint-disable-next-line quotes
      `TypeError: Cannot read properties of undefined (reading 'protocol')`,
    );
    try {
      /* @ts-expect-error */
      await updateMarkYourSelfAs_(undefined);
    } catch (err) {
      expect(err).toEqual(
        // eslint-disable-next-line quotes
        `TypeError: Cannot read properties of undefined (reading 'protocol')`,
      );
    }
  });

  test('passes url to get changed status', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { status: Strings.Active_Text },
    });

    try {
      const res = await updateMarkYourSelfAs_(Strings.Active_Text);
      expect(res).toEqual(Strings.Active_Text);
    } catch (err) {}
  });

  test('passes url to receive thrown error', async () => {
    mockedAxios.patch.mockRejectedValue('500: internal server error');

    try {
      await updateMarkYourSelfAs_(Strings.Active_Text);
    } catch (err) {
      expect(err).toEqual('500: internal server error');
    }
  });
});

test('check is otpcode of valid format', () => {
  expect(isValidTextInput('')).toBeTruthy();
  expect(isValidTextInput('1234')).toBeTruthy();
  expect(isValidTextInput('abcd')).toBeFalsy();
  expect(isValidTextInput('AB12')).toBeFalsy();
  expect(isValidTextInput('1%2B')).toBeFalsy();
});
