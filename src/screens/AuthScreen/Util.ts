import axios from 'axios';
import { urls } from '../../constants/appConstant/url';
import { User } from '../../context/type';

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
      profileUrl: res.data?.picture?.url,
      status: res.data?.status,
    };
  } else {
    return null;
  }
};

export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(urls.GET_USER_DATA + userId, {
      headers: {
        cookie: '',
      },
    });
    const user = response.data.user;
    return {
      name: user.github_display_name,
      profileUrl: user.picture?.url,
      userName: user.username,
      designation: user.designation,
      company: user.company,
      linkedInUrl: urls.LINKEDIN + user.linkedin_id,
      twitterUrl: urls.GITHUB + user.twitter_id,
      githubUrl: urls.TWITTER + user.github_id,
    };
  } catch (error) {
    return null;
  }
};

export const fetchContribution = async (userName: string): Promise<any> => {
  try {
    const response = await axios.get(urls.GET_CONTRIBUTIONS + userName, {
      headers: {
        cookie: '',
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
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

export const isValidTextInput = (code: string) =>
  Boolean(/^[\d]{1,4}$|^$/.test(code));
