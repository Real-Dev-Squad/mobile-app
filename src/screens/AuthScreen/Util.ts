import axios from 'axios';
import { urls } from '../../constants/appConstant/url';
import { HomeApi } from '../../constants/apiConstant/HomeApi';

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

export const getUsersStatus = async () => {
  const res = await axios.get(HomeApi.GET_USER_STATUS, {
    headers: {
      'Content-type': 'application/json',
      cookie:
        'rds-session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUN0lMN01COFlyaW5pVHc0YnQzOSIsImlhdCI6MTY5MjYyMTQ2NCwiZXhwIjoxNjk1MjEzNDY0fQ.DAkTkEJmhEKz9-2w6bOoPLseH6jZA9kajxmkB64CqtTc25wPRa12OKhby5_CnWmTioz3adUwGFV1JWgjtZXLNSEt1j1PSDRo_wy_XEdH5-O1OkNYFIkc4TPnTXM-eUAcGVebmRGEaD326SYZ3Zm0euqFc1zcTHdFubukIVRhgmXC-y2GC9oEr8fpH1EvGJi_H93gkyvTYuU6Z84m7q2GEEKrrTdRdkE1lycS1l-vODSex1yGPu1y8lDmhR5zdc-GbDFv7uhMDPysasmM-jM1yTZE9fEfAj97Pei3YaT0BeL5L-IIEblELqpq0IfrlyxPsgNV10zyYPOnU4NQKl6ydg',
    },
  });
  console.log('res', res);
  return res.data.data.currentStatus.state;
};

export const submitOOOForm = async (data) => {
  const options = {
    headers: {
      'Content-type': 'application/json',
      cookie:
        'rds-session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUN0lMN01COFlyaW5pVHc0YnQzOSIsImlhdCI6MTY5MjYyMTQ2NCwiZXhwIjoxNjk1MjEzNDY0fQ.DAkTkEJmhEKz9-2w6bOoPLseH6jZA9kajxmkB64CqtTc25wPRa12OKhby5_CnWmTioz3adUwGFV1JWgjtZXLNSEt1j1PSDRo_wy_XEdH5-O1OkNYFIkc4TPnTXM-eUAcGVebmRGEaD326SYZ3Zm0euqFc1zcTHdFubukIVRhgmXC-y2GC9oEr8fpH1EvGJi_H93gkyvTYuU6Z84m7q2GEEKrrTdRdkE1lycS1l-vODSex1yGPu1y8lDmhR5zdc-GbDFv7uhMDPysasmM-jM1yTZE9fEfAj97Pei3YaT0BeL5L-IIEblELqpq0IfrlyxPsgNV10zyYPOnU4NQKl6ydg',
    },
  };
  const body = data;
  const res = await axios.patch(HomeApi.UPDATE_STATUS, body, options);
  return res;
};

export const isValidTextInput = (code: string) =>
  Boolean(/^[\d]{1,4}$|^$/.test(code));
