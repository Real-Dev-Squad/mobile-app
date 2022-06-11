import { getUserData } from '../src/screens/AuthScreen/Util';
import { urls } from '../src/constants/appConstant/url';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUserData = {
  github_display_name: 'Jane Doe',
  picture: { url: 'https://via.placeholder.com/600/d32776' },
};

describe('getUserData util', () => {
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
      name: 'Jane Doe',
      profileUrl: 'https://via.placeholder.com/600/d32776',
    });
  });

  test('when redirect url is passed to getUserData && axios call fails return null', async () => {
    /* tslint:disable-next-line */
    mockedAxios.get.mockRejectedValue('500: server error');
    try {
      await getUserData(urls.REDIRECT_URL);
    } catch (err) {
      expect(err).toEqual('500: server error');
    }
  });
});
