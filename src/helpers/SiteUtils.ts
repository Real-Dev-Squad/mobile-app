import { Dimensions } from 'react-native';

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const formatDate = (_date: any) => {
  if (!_date) {
    return 'NA';
  }
  // Unix timestamp in seconds
  // const timestamp = _date;

  // // Create a new Date object using the timestamp
  // const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // // Get the components of the date
  // const day = date.getDate();
  // const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  // const year = String(date.getFullYear()).slice(-2);

  // // Create a formatted date string
  // const formattedDate = `${year}/${month < 10 ? '0' : ''}${month}/${
  //   day < 10 ? '0' : ''
  // }${day}`;

  // return formattedDate;
  // Extract day, month, and year components
  const day = _date.getDate();
  const month = _date.getMonth() + 1; // Note: Month is zero-based
  const year = _date.getFullYear() % 100; // Get the last two digits of the year

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Create the DD.MM.YY formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
};
export const formatTimeSlotDate = (timeSlotDate: any) => {
  const timeSlotDateObj = new Date(timeSlotDate * 1000);
  return formatDate(timeSlotDateObj);
};

export const formatTimeSlotTime = (timeSlotDate: any) => {
  const timeSlotDateObj = new Date(timeSlotDate * 1000);
  const hours = timeSlotDateObj.getHours().toString().padStart(2, '0');
  const minutes = timeSlotDateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
