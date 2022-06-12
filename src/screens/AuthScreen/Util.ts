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
      id: res.data.id,
      name: res.data.github_display_name,
      profileUrl: res.data.picture.url,
      status: res.data.status,
    };
  }
  return null;
};

export const updateStatus = async (status: string) => {
  const res = await axios.patch(
    urls.GET_USERS_DATA,
    { status },
    {
      headers: {
        cookie: '',
      },
    },
  );
  return res.config.data.status;
};

export const updateMarkYourSelfAs_ = async (markStatus: string) => {
  const res = await axios.patch(
    urls.GET_USERS_DATA,
    { status: markStatus },
    {
      headers: {
        cookie: '',
      },
    },
  );

  return res.data.status;
};
