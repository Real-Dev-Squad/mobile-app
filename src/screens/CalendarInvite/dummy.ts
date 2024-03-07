// eventType : public  | private
// eventName : 'test event'
// eventScheduledBy : null

// post event
// id:{
//   eventScheduledBy :'',
//   eventType : public | private
//   eventName : 'test event'
//   startTime:
//   endTime:
// }
import { firebase } from '@react-native-firebase/database';
import firestore, { Filter } from '@react-native-firebase/firestore';
import moment from 'moment';

const eventsCollection = firestore().collection('events');

export const durations = [15, 30, 45, 60];

const getUserTimezone = (utcTimestamp) => {
  let date = new Date(utcTimestamp);

  // Get the timezone offset in minutes
  let offsetInMinutes = date.getTimezoneOffset();

  // Add the user's timezone offset to the timestamp
  let timestampWithOffset = utcTimestamp + offsetInMinutes * 60 * 1000;

  return timestampWithOffset;
};

export const fetchEvents = async () => {
  let eventSnapshot = await eventsCollection.get();

  const events: any = [];
  eventSnapshot.forEach((event: any) => {
    events.push({
      id: event.id,
      ...event.data(),
      // startTime: getUserTimezone(event.startTime),
      // endTime: getUserTimezone(event.endTime),
      // startTime: Number(event.data().startTime),
      // endTime: Number(event.data().endTime),
    });
  });
  console.log('events', events);
  return events;
};

export const postEvent = async (eventData) => {
  return eventsCollection
    .add(eventData)
    .then((docRef) => {
      console.log('Data posted successfully with ID:', docRef.id);
      return Promise.resolve();
    })
    .catch((error) => {
      console.error('Error posting data:', error);
      return Promise.reject();
    });
};

//
export const event = [
  {
    userId: ['kpBV5NrcHYb88xzgiC0u'], // participant
    eventType: 'public',
    eventName: 'test1 event',
    eventScheduledBy: 'shreya', //userId
    // start time and end time without timezone
    startTime: 1708651681,
    endTime: 1708389172,
  },
  {
    userId: 'AaVNd2Jaz05bGvmW2ndz',
    eventType: 'public',
    eventName: 'test1 event',
    eventScheduledBy: 'joy',
    startTime: 1708646281,
    endTime: 1708389172, //with timezone
  },
];

/*
1. Sort events based on startTime
2. Column
  multiplier
  Parent Container
    a. First Column => Side Column : Time
      Fixed height x multiplier, each time slot will also have a fix height x multiplier
      Eg : 24Hr => 2400px x multiplier => 1hr slot : 100px x multiplier
    b. Event Columns Container : All event will render inside this
       Position : Relative
    c. Slots
        - Sorted
        - Position : Absolute
        - Top, height
            Height : height of a minute x duration
            Top : height of a minute x (startTime's HH:MM => minutes x multiplier => position)

    d. Collapsing Events
       - Sorted
       while rendering nth slot
        - (n+1)slot start time lies in between nth event's start & end time
          - border bottom : red
          - z-index : 9
      while rendering n+1 slot
      - (n+1)slot start time lies in between nth event's start & end time
        - z-index : 99



 */

export const calendarData = [
  {
    kpBV5NrcHYb88xzgiC0u: {
      first_name: 'Akansh',
      last_name: 'Surendran',
    },
  },
  {
    '88vEUmbUBlMrDLqVCvlZ': {
      first_name: 'Divyansh',
      timeSlots: [
        {
          startTime: 1708389172,
          endTime: 1708389172,
        },
        {
          startTime: 1708510766,
          endTime: 1708511007,
        },
      ],
    },
  },
  {
    AaVNd2Jaz05bGvmW2ndz: {
      first_name: 'Edwin',
      timeSlots: [
        {
          startTime: 1708620207,
          endTime: 1708614807,
        },
        {
          startTime: 1708338207,
          endTime: 1708389172,
        },
        {
          startTime: 1708620207,
          endTime: 1708614807,
        },
      ],
    },
  },
];

export const postInvite = [
  {
    eventUniqueId: {
      users: ['AaVNd2Jaz05bGvmW2ndz'],
      eventScheduledBy: 'unique name',
      eventType: 'public',
      eventName: 'test event',
      startTime: 1708701207,
      endTime: 1708711707,
    },
  },
];

export const postToRDB = (val: number) => {
  firebase
    .app()
    .database()
    .ref('progressVal')
    .set({
      progressVal: val,
    })
    .then(() => console.log('Data set>>>>>>>>>>>'));
};
