import { Dimensions } from 'react-native';
import { format, fromUnixTime, getTime, parse } from 'date-fns';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

export const eventsCollection = firestore().collection('events');

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const CELL_HEIGHT = 60;
// export const todaysDate = format(new Date(), 'dd-MM-yyyy');
// export const formatDate = (date: string) =>
//   format(new Date(date), 'dd-MM-yyyy');

export const formatDate = (date: any) => {
  if (!date) {
    return 'NA';
  }

  const _date = new Date(date);
  return _date.toLocaleDateString();
};
export const timestampToFormatTime = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  const formattedTime = format(date, 'HH:mm:ss');
  return formattedTime;
};

export const transformTime_ = (
  selectedD: Date,
  time: { hours: number; minutes: number },
) => {
  let newDateString = formatToSend(selectedD, time);

  console.log('🚀 ~ newDateString:', { newDateString, selectedD, time });
  const dateTime = parse(newDateString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const unixTimestamp = Math.floor(getTime(dateTime) / 1000);
  console.log('🚀 ~ unixTimestamp:', unixTimestamp);

  return unixTimestamp;
};

export const formatToSend = (
  d: Date,
  t: { hours: number; minutes: number },
) => {
  let date_ = new Date(d).toLocaleDateString().split('/');
  const newHr = t.hours < 10 ? `0${t.hours}` : t.hours;
  const newMin = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
  const newT = typeof t === 'object' ? `${newHr}:${newMin}:00` : t;
  const formatDD = `20${date_[2]}-${date_[0]}-${date_[1]}T${newT}`;
  return formatDD;
};

export const decimalToTime = (decimalValue: number) => {
  var hours = Math.floor(decimalValue);

  // Calculate remaining minutes
  var remainingMinutes = (decimalValue - hours) * 60;

  // Extract minutes
  var minutes = Math.floor(remainingMinutes);

  // Calculate remaining seconds
  var seconds = Math.round((remainingMinutes - minutes) * 60);
  console.log({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
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
export const toUnix = (_date: any) => {
  const dateTimeString = _date;
  const unixTimestamp = moment(dateTimeString).unix();
  return unixTimestamp;
};

export const minHourSelectedDate = (d) => {
  return new Date(d).setHours(0, 0, 0, 0) / 1000;
};
export const timestampToUnix = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  const formattedTime = format(date, 'HH:mm:ss');
  return formattedTime;
};

export const getSortedEvents = (data: any) => {
  // const event_ = await fetchEvents();
  const sortedEvents = data?.sort((a, b) => a.startTime - b.startTime);
  return sortedEvents;
};

export const calculateCurrentTimePosition = (multiplier: number) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const position = currentHour * 60 + currentMinutes; // Position in minutes

  // Calculate the position based on your progressVal and other factors
  return (position * multiplier) / 60;
};
