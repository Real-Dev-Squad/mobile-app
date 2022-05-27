import axios from 'axios';
import { urls } from '../../constants/appConstant/url';

export const getUserData = async (url: string) => {
  if (url === urls.REDIRECT_URL) {
    return axios
      .get(urls.GET_USERS_DATA, {
        headers: {
          cookie: '',
        },
      })

      .then((res) =>
        Promise.resolve({
          name: res.data.github_display_name,
          profileUrl: res.data.picture.url,
        }),
      )
      .catch((err) => Promise.reject(null));
  }
  return null;
};
