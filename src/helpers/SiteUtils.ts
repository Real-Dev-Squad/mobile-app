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

export const getColonTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const newTime =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes);
  return newTime;
};
export const transformedArrFunc = (matchingUsers: any) => {
  // [
  //   {
  //     endTime: 1708904700,
  //     eventName: 'Fcgg',
  //     eventScheduledBy: 'T7IL7MB8YriniTw4bt39',
  //     eventType: 'public',
  //     first_name: 'Ankush',
  //     id: 'XAF7rSUvk4p0d098qWYS',
  //     last_name: 'Dharkar',
  //     picture: {
  //       url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1692058952/profile/XAF7rSUvk4p0d098qWYS/me40uk7taytbjaa67mhe.jpg',
  //     },
  //     startTime: 1708903800,
  //     userId: ['XAF7rSUvk4p0d098qWYS'],
  //   },
  // ];

  let sortedArr = matchingUsers.sort((a, b) => a.startTime - b.startTime);
  let endTime = [];
  let eventName = [];
  let first_name = [],
    last_name = [],
    startTime = [],
    eventScheduledBy = [],
    eventType = [],
    id = [],
    picture = [];
  sortedArr.forEach((event) => {
    first_name = [...first_name, event.first_name];
    last_name = [...last_name, event.last_name];
    eventName = [...eventName, event.eventName];
    endTime = [...endTime, event.endTime];
    startTime = [...startTime, event.startTime];
    eventScheduledBy = [...eventScheduledBy, event.eventScheduledBy];
    eventType = [...eventType, event.eventType];
    id = [...id, event.id];
    picture = [...picture, event.picture];
  });
  let transformArr = [
    {
      first_name,
      eventName,
      endTime,
      last_name,
      startTime,
      eventScheduledBy,
      eventType,
      id,
      picture,
    },
  ];
  return transformArr;
};
export const Time_Slots = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
export const randomColor = () => {
  let newColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${newColor}`;
};
