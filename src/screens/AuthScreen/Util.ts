import axios from 'axios';
import { urls } from '../../constants/appConstant/url';
import { HomeApi } from '../../constants/apiConstant/HomeApi';

export const getUserData = async (token: string) => {
  try {
    const res = await axios.get(urls.GET_USERS_DATA, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `rds-session=${token}`,
      },
    });
    return {
      id: res.data.id,
      name: res.data.github_display_name,
      profileUrl: res.data?.picture?.url,
      status: res.data?.status,
    };
  } catch (e) {
    console.log('err', e);
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
  try {
    const res = await axios.get(HomeApi.GET_USER_STATUS, {
      headers: {
        'Content-type': 'application/json',
        cookie:
          'rds-session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUN0lMN01COFlyaW5pVHc0YnQzOSIsImlhdCI6MTY5MjYyMTQ2NCwiZXhwIjoxNjk1MjEzNDY0fQ.DAkTkEJmhEKz9-2w6bOoPLseH6jZA9kajxmkB64CqtTc25wPRa12OKhby5_CnWmTioz3adUwGFV1JWgjtZXLNSEt1j1PSDRo_wy_XEdH5-O1OkNYFIkc4TPnTXM-eUAcGVebmRGEaD326SYZ3Zm0euqFc1zcTHdFubukIVRhgmXC-y2GC9oEr8fpH1EvGJi_H93gkyvTYuU6Z84m7q2GEEKrrTdRdkE1lycS1l-vODSex1yGPu1y8lDmhR5zdc-GbDFv7uhMDPysasmM-jM1yTZE9fEfAj97Pei3YaT0BeL5L-IIEblELqpq0IfrlyxPsgNV10zyYPOnU4NQKl6ydg',
      },
    });
    if (res.data.data.currentStatus) {
      return res.data.data.currentStatus.state;
    } else {
      return 'Something went wrong';
    }
  } catch (err) {
    return 'Something went wrong';
  }
};

export const submitOOOForm = async (data) => {
  console.log('data', data);
  const options = {
    headers: {
      'Content-type': 'application/json',
      cookie:
        'rds-session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUN0lMN01COFlyaW5pVHc0YnQzOSIsImlhdCI6MTY5MjYyMTQ2NCwiZXhwIjoxNjk1MjEzNDY0fQ.DAkTkEJmhEKz9-2w6bOoPLseH6jZA9kajxmkB64CqtTc25wPRa12OKhby5_CnWmTioz3adUwGFV1JWgjtZXLNSEt1j1PSDRo_wy_XEdH5-O1OkNYFIkc4TPnTXM-eUAcGVebmRGEaD326SYZ3Zm0euqFc1zcTHdFubukIVRhgmXC-y2GC9oEr8fpH1EvGJi_H93gkyvTYuU6Z84m7q2GEEKrrTdRdkE1lycS1l-vODSex1yGPu1y8lDmhR5zdc-GbDFv7uhMDPysasmM-jM1yTZE9fEfAj97Pei3YaT0BeL5L-IIEblELqpq0IfrlyxPsgNV10zyYPOnU4NQKl6ydg',
    },
  };
  const body = data;
  try {
    const res = await axios.patch(HomeApi.UPDATE_STATUS, body, options);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.log('error', err);
  }
};

export const cancelOoo = async () => {
  const options = {
    headers: {
      'Content-type': 'application/json',
      cookie:
        'rds-session=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUN0lMN01COFlyaW5pVHc0YnQzOSIsImlhdCI6MTY5MjYyMTQ2NCwiZXhwIjoxNjk1MjEzNDY0fQ.DAkTkEJmhEKz9-2w6bOoPLseH6jZA9kajxmkB64CqtTc25wPRa12OKhby5_CnWmTioz3adUwGFV1JWgjtZXLNSEt1j1PSDRo_wy_XEdH5-O1OkNYFIkc4TPnTXM-eUAcGVebmRGEaD326SYZ3Zm0euqFc1zcTHdFubukIVRhgmXC-y2GC9oEr8fpH1EvGJi_H93gkyvTYuU6Z84m7q2GEEKrrTdRdkE1lycS1l-vODSex1yGPu1y8lDmhR5zdc-GbDFv7uhMDPysasmM-jM1yTZE9fEfAj97Pei3YaT0BeL5L-IIEblELqpq0IfrlyxPsgNV10zyYPOnU4NQKl6ydg',
    },
  };
  const body = { cancelOoo: true };
  try {
    const res = await axios.patch(HomeApi.UPDATE_STATUS, body, options);
    if (res.status === 200) {
      console.log('response in cancelling', res);
      return res;
    } else {
      throw new Error('Api is failing');
    }
  } catch (err) {
    console.log('error', err);
  }
};

export const isValidTextInput = (code: string) =>
  Boolean(/^[\d]{1,4}$|^$/.test(code));

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Accessing your camera to scan the QR code',
        message:
          'RDS App needs access to your camera ' + 'so you can scan QR code',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
