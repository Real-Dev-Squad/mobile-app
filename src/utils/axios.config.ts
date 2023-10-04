import axios from 'axios';

export const axiosInstance = axios.create({
  // TODO: please get this base URL from env file
  baseURL: 'https://api.realdevsquad.com',
  withCredentials: false,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('API error', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.data, 'Response was received');
    return response.data;
  },
  (error) => {
    // handle the response error
    if (
      error.response.data.message.toLowerCase().includes('unauthorised access')
    ) {
      //   toast.error(error?.data?.message);
    }
    throw Promise.reject(error.response);
  },
);
