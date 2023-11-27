import axios from 'axios';
import { urls } from '../../constants/appConstant/url';
import { HomeApi } from '../../constants/apiConstant/HomeApi';
import { PermissionsAndroid } from 'react-native';

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
      twitter_id: res.data?.twitter_id,
      linkedin_id: res.data?.linkedin_id,
      github_id: res.data?.github_id,
      username: res?.data?.username,
      token: token,
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

export const fetchActiveTasks = async (userName: string): Promise<any> => {
  try {
    const response = await axios.get(urls.GET_ACTIVE_TASKS + userName, {
      headers: {
        Cookie: '',
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const validateTaskProgress = (
  taskCompleted,
  taskPlanned,
  taskBlockers,
): Boolean => {
  return (
    taskCompleted.trim() == '' ||
    taskPlanned.trim() == '' ||
    taskBlockers.trim() == ''
  );
};

export const fetchTaskDetails = async (taskId: String): Promise<any> => {
  try {
    const response = await axios.get(
      urls.GET_TASK_DETAIL + taskId + '/details',
      {
        headers: {
          Cookie: '',
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchTaskProgressDetails = async (
  taskId: String,
): Promise<any> => {
  try {
    const response = await axios.get(urls.GET_TASK_PROGRESS_DETAIL + taskId, {
      headers: {
        Cookie: '',
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

export const getUsersStatus = async (token) => {
  try {
    const res = await axios.get(HomeApi.GET_USER_STATUS, {
      headers: {
        'Content-type': 'application/json',
        cookie: `rds-session=${token}`,
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

export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(HomeApi.GET_ALL_USERS, {
      headers: {
        'Content-type': 'application/json',
        cookie: `rds-session=${token}`,
      },
    });
    if (res?.data?.users) {
      return res?.data?.users;
    } else {
      return 'Something went wrong';
    }
  } catch (err) {
    return 'Something went wrong';
  }
};

export const submitOOOForm = async (data, token) => {
  console.log('data', data);
  const options = {
    headers: {
      'Content-type': 'application/json',
      cookie: `rds-session=${token}`,
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

export const cancelOoo = async (token) => {
  const options = {
    headers: {
      'Content-type': 'application/json',
      cookie: `rds-session=${token}`,
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

export const formatTimeToUnix = (date) => {
  const newDate = new Date(date);

  // Convert the date to Unix Epoch timestamp in seconds
  const unixTimestampInSeconds = newDate.getTime();
  return unixTimestampInSeconds;
};

export const convertTimestampToReadableDate = (timestamp) => {
  return new Date(timestamp * 1000);
};

export const calculateTimeDifference = (startDate, endDate) => {
  const timeDifference = endDate - startDate;
  const secondsInMillisecond = 1000;
  const minutesInMillisecond = 60 * secondsInMillisecond;
  const hoursInMillisecond = 60 * minutesInMillisecond;
  const daysInMillisecond = 24 * hoursInMillisecond;
  const weeksInMillisecond = 7 * daysInMillisecond;
  const monthsInMillisecond = 30.44 * daysInMillisecond; // Average month length
  const yearsInMillisecond = 365 * daysInMillisecond;

  if (timeDifference < minutesInMillisecond) {
    return `${Math.floor(timeDifference / secondsInMillisecond)} seconds`;
  } else if (timeDifference < hoursInMillisecond) {
    return `${Math.floor(timeDifference / minutesInMillisecond)} minutes`;
  } else if (timeDifference < daysInMillisecond) {
    return `${Math.floor(timeDifference / hoursInMillisecond)} hours`;
  } else if (timeDifference < weeksInMillisecond) {
    return `${Math.floor(timeDifference / daysInMillisecond)} days`;
  } else if (timeDifference < monthsInMillisecond) {
    return `${Math.floor(timeDifference / weeksInMillisecond)} weeks`;
  } else if (timeDifference < yearsInMillisecond) {
    return `${Math.floor(timeDifference / monthsInMillisecond)} months`;
  } else {
    return `${Math.floor(timeDifference / yearsInMillisecond)} years`;
  }
};

export const calculateISODateFormat = (isoDateString) => {
  const date = new Date(isoDateString);
  const formatDate = (d) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = d.getDate();
    const monthIndex = d.getMonth();
    const year = d.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
  };
  const formattedDate = formatDate(date);
  return formattedDate;
};

export const parseISODate = (isoDateString) => {
  return new Date(isoDateString);
};

export const getDate = (date) => {
  var day = new Date(date);
  var weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var date = day.getDate();
  var month = day.getMonth();
  var year = day.getFullYear();
  return `${weekDays[day.getDay()]}, ${date} ${months[month]} ${year}`;
};

export const getDateAndTimeFromUnix = (unixTimestampSeconds) => {
  const unixTimestampMilliseconds = unixTimestampSeconds * 1000;
  const date = new Date(unixTimestampMilliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}/${month}/${year} ${hours <= 9 ? '0' + hours : hours}:${
    minutes <= 9 ? '0' + minutes : minutes
  }:${seconds <= 9 ? '0' + seconds : seconds}`;
};
