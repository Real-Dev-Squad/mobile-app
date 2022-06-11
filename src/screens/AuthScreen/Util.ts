import axios from 'axios';
import { urls } from '../../constants/appConstant/url';

export const getUserData = async (url: string) => {
  if (url === urls.REDIRECT_URL) {
    const res = await axios.get(urls.GET_USERS_DATA, {
      headers: {
        cookie: '',
      },
    });
    return {
      name: res.data.github_display_name,
      profileUrl: res.data.picture.url,
    };
  } else {
    return null;
  }
};
