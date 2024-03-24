import { Dimensions } from 'react-native';
import { fetchEvents } from '../screens/CalendarInvite/dummy';
import moment from 'moment';
import { format, fromUnixTime, getTime, parse } from 'date-fns';

export const CELL_HEIGHT = 60;

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const formatDate = (date: any) => {
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
function formatTimeforUnix(duration) {
  var hours = duration.hours.toString().padStart(2, '0');
  var minutes = duration.minutes.toString().padStart(2, '0');
  var seconds = duration.seconds.toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}

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
export const toUnix = (_date: any) => {
  const dateTimeString = _date;
  const unixTimestamp = moment(dateTimeString).unix();
  return unixTimestamp;
};
export const randomColor = () => {
  let newColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${newColor}`;
};
export const calculateCurrentTimePosition = (progressVal, multiplier) => {
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

export const decimalToTime = (decimalValue) => {
  // Extract hours
  var hours = Math.floor(decimalValue);

  // Calculate remaining minutes
  var remainingMinutes = (decimalValue - hours) * 60;

  // Extract minutes
  var minutes = Math.floor(remainingMinutes);

  // Calculate remaining seconds
  var seconds = Math.round((remainingMinutes - minutes) * 60);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};
export const formatToSend = (d, t) => {
  console.log('🚀 ~ formatToSend ~ d:', { d, t });
  let date_ = new Date(d).toLocaleDateString().split('/');
  const newHr = t.hours < 10 ? `0${t.hours}` : t.hours;
  const newMin = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
  const newT = typeof t === 'object' ? `${newHr}:${newMin}:00` : t;
  const formatDD = `20${date_[2]}-${date_[0]}-${date_[1]}T${newT}`;
  console.log('🚀 ~ formatToSend ~ newT:', newT);
  return formatDD;
};

export const transformTime_ = (selectedD, time) => {
  let newDateString = formatToSend(selectedD, time);
  const dateTime = parse(newDateString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const unixTimestamp = Math.floor(getTime(dateTime) / 1000);
  console.log('🚀 ~ unixTimestamp:', unixTimestamp);

  return unixTimestamp;
};

export const epocToDateTime = (
  timestamp: number,
  inms = false,
  dateFromzero = true,
) => {
  // Convert to milliseconds
  //1705381980,
  var milliseconds = inms ? timestamp : timestamp * 1000;

  // Create a new Date object
  var date = new Date(milliseconds);

  // Get the various components of the date and time
  var year = date.getFullYear();
  var month = dateFromzero ? date.getMonth() + 1 : date.getMonth(); // Note: Months are zero-based
  console.log('🚀 ~ month:', month);
  var day = dateFromzero ? date.getDate() + 1 : date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // if (month === 0) {
  //   year--; // Adjust year
  //   month = 12; // Set month to December
  // }

  // Format the date and time
  var formattedDateTime = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }T${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`;
  console.log('🚀 ~ epocToDateTime ~ formattedDateTime:', formattedDateTime);

  return formattedDateTime;
};

export const abc = (timestamp) => {
  console.log('🚀 ~ abc ~ timestamp:', timestamp);
  const date = fromUnixTime(timestamp);
  const formattedTime = format(date, 'HH:mm:ss');
  console.log('🚀 ~ abc ~ formattedTime:', formattedTime);
  return formattedTime;
};
