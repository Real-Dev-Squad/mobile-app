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

export const durations = [15, 30, 45, 60];

export const event = [
  {
    userId: 'kpBV5NrcHYb88xzgiC0u',
    eventType: 'public',
    eventName: 'test1 event',
    eventScheduledBy: 'shreya',
    // start time and end time without timezone
    startTime: 1708651681,
    endTime: 1708389172,
  },
  {
    userId: 'AaVNd2Jaz05bGvmW2ndz',
    eventType: 'public',
    eventName: 'test1 event',
    eventScheduledBy: 'shreya',
    startTime: 1708646281,
    endTime: 1708389172,
  },
];
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
