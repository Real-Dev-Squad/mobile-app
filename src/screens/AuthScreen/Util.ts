import axios from 'axios';
import {urls} from '../../constants/appConstant/url';

export const getUserData = async (url: string) => {
  console.log(url);
  if (url === 'https://www.realdevsquad.com/goto') {
    return axios
      .get(`https://api.realdevsquad.com/users/self`, {
        headers: {
          cookie: '',
        },
      })

      .then(res =>
        Promise.resolve({
          name: res.data.github_display_name,
          profileUrl: res.data.picture.url,
        }),
      )
      .catch(err => Promise.reject(null));
  }
  return null;
};
