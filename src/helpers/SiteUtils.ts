import { Dimensions } from 'react-native';
import { fetchEvents } from '../screens/CalendarInvite/dummy';

export const CELL_HEIGHT = 60;

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const formatDate = (date: any) => {
  console.log('🚀 ~ formatDate ~ date:', date);
  if (!date) {
    return 'NA';
  }

  const _date = new Date(date);
  return _date.toLocaleDateString();
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
    (hours < 10 ? `0${hours}` : hours) +
    ':' +
    (minutes < 10 ? `0${minutes}` : minutes);
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
export const calculateCurrentTimePosition = (progressVal, multiplier) => {
  console.log('🚀 ~ calculateCurrentTimePosition ~ multiplier:', multiplier);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const position = currentHour * 60 + currentMinutes; // Position in minutes

  // Calculate the position based on your progressVal and other factors
  return (position * multiplier) / 60;
};

export const getEvents = async () => {
  const event_ = await fetchEvents();
  return event_;
};

export const getSortedEvents = (data: any) => {
  console.log('🚀 ~ getSortedEvents ~ data:', data);
  // const event_ = await fetchEvents();
  const sortedEvents = data?.sort((a, b) => a.startTime - b.startTime);
  return sortedEvents;
};
export const getStartAndEndTime = (date) => {
  // Set start time to 00:00:00
  const startTime = new Date(date);
  startTime.setHours(0);
  startTime.setMinutes(0);
  startTime.setSeconds(0);

  // Set end time to 23:59:59
  const endTime = new Date(date);
  endTime.setHours(23);
  endTime.setMinutes(59);
  endTime.setSeconds(59);

  return { startTime, endTime };
};
