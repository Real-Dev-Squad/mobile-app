import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios.config';

export const getApi = async ({
  endPointName,
  config = {},
}: {
  endPointName: string;
  config?: AxiosRequestConfig;
}) => {
  try {
    const response = await axiosInstance.get(endPointName, config);
    return response;
  } catch (error) {
    return error;
  }
};

export const postApi = async ({
  endPointName,
  payload = {},
  config = {},
}: {
  endPointName: string;
  payload?: any;
  config?: AxiosRequestConfig;
}) => {
  try {
    const response = await axiosInstance.post(endPointName, payload, config);
    return response;
  } catch (error) {
    throw error;
  }
};

// Wrapper function for sending a PATCH request
export const patchApi = async ({
  endPointName,
  payload = {},
  config = {},
}: {
  endPointName: string;
  payload?: any;
  config?: AxiosRequestConfig;
}) => {
  try {
    const response = await axiosInstance.patch(endPointName, payload, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteApi = async ({
  endPointName,
  config,
}: {
  endPointName: string;
  config?: AxiosRequestConfig;
}) => {
  try {
    const response = await axiosInstance.delete(endPointName, config);
    return response;
  } catch (error) {
    throw error;
  }
};
