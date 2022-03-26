import axios from 'axios';

export const getUserData = async (url: string) => {
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
