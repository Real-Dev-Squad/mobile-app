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
  console.log('🚀 ~ fetchEvents ~ events:', events);
  return events;
};

export const postEvent = async (eventData) => {
  // {"endTime": 1710986760, "eventName": "Test event", "eventScheduledBy": "T7IL7MB8YriniTw4bt39", "eventType": "public", "id": "jbIbyaJMrqog56Slk30m", "startTime": 1710986340, "userId": ["YzEVZ50DHr37oL1mqqbO"], "users_": [{"company": "Yudek", "company_name": "Yudek", "created_at": 1709928398392, "designation": "SDE", "discordId": "688997548614090752", "discordJoinedAt": "2020-03-16T06:31:35.804000+00:00", "first_name": "Prakash", "github_created_at": 1513007526000, "github_display_name": "Prakash Choudhary", "github_id": "prakashchoudhary07", "github_user_id": "34452139", "id": "YzEVZ50DHr37oL1mqqbO", "incompleteUserDetails": false, "instagram_id": "", "isMember": true, "last_name": "Choudhary", "linkedin_id": "prakashchoudhary07", "picture": [Object], "profileStatus": "BLOCKED", "profileURL": "https://profile-service-rds-prakash.herokuapp.com/", "roles": [Object], "status": "active", "twitter_id": "pc2097", "updated_at": 1709928398392, "username": "Prakash", "website": "", "yoe": 2}]}

  console.log('🚀 ~ postEvent ~ eventData:!!!!!!!!!!!!!!!!!!', eventData);
  return eventsCollection
    .add(eventData)
    .then((docRef) => {
      return Promise.resolve();
    })
    .catch((error) => {
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
    .then(() => console.log('UPDATED PROGRESS VALUE IS SAVED IN DATABASE'));
};

export const postLiveUsers = (userId: string) => {
  const liveUsersRef = firebase.app().database().ref('liveUsers');
  liveUsersRef
    .once('value')
    .then((snapshot) => {
      const currentData = snapshot.val();
      let currentUsers: string[] = [];

      if (currentData && currentData.userIds) {
        currentUsers = currentData.userIds;
      }

      if (!currentData || !currentData.userIds) {
        return liveUsersRef.update({
          // liveUserInfo: { [id]: position },
          userIds: [userId],
        });
      }
      // Check if the userId already exists in the array
      if (userId && !currentUsers.includes(userId)) {
        // Add the new user ID to the array
        currentUsers.push(userId);

        // Update the 'userIds' array in Firebase
        return liveUsersRef.update({
          userIds: currentUsers,
        });
      } else {
        return Promise.resolve(); // Resolve the promise without updating if userId exists
      }
    })
    .then(() => console.log('LIVE USER POSTING DONE'))
    .catch((error) => console.error('Error updating data:', error));
};

export const getLiveUsers = (liveUsers: { userIds: string }) => {
  const currentData = liveUsers;
  // If there are existing user IDs, return them
  if (currentData && currentData) {
    return currentData;
  } else {
    return []; // Return an empty array if no user IDs are found
  }
};

export const removeOfflineUser = async (userId?: string) => {
  try {
    const database = firebase.database();
    const liveUsersRef = database.ref('liveUsers/userIds');

    // Get the current user IDs object
    const snapshot = await liveUsersRef.once('value');
    const userIds = snapshot.val();
    let index = userIds.indexOf(userId);
    if (index !== -1) {
      // Remove the user ID from the object
      userIds.splice(index, 1);

      // Update the user IDs object in the database
      await liveUsersRef.set(userIds);
    }
  } catch (error) {
    console.error('Error removing user ID from liveUsers:', error);
  }
};
export const removePositionWithId = async (userId?: string) => {
  try {
    const database = firebase.database();
    const liveUsersRef = database.ref('liveUsers/liveUserInfo');

    // Get the current user IDs object
    const snapshot = await liveUsersRef.once('value');
    const userInfo = snapshot.val();
    if (userId && userId in userInfo) {
      delete userInfo[userId];
    }
    await liveUsersRef.set(userInfo);

    // Find the index of the user ID to remove dynamically
  } catch (error) {
    console.error('Error removing user ID from liveUsers:', error);
  }
};
export const postPositionWithId = (
  id: string,
  position: number,
  prevLiveUserId: {},
  selectedDate,
) => {
  const liveUsersRef = firebase.app().database().ref('liveUsers');
  liveUsersRef
    .once('value')
    .then((snapshot) => {
      const currentData = snapshot.val();
      const timestamp = Date.now();
      const minHourSelectedDate =
        new Date(selectedDate).setHours(0, 0, 0, 0) / 1000;
      if (!currentData || !currentData.liveUserInfo) {
        return liveUsersRef.set({
          liveUserInfo: {
            [id]: { position, timestamp },
          },
          userIds: { ...prevLiveUserId },
        });
      } else if (currentData.liveUserInfo) {
        //TODO:
        let liveUserInfo = currentData &&
          currentData.liveUserInfo && { ...currentData.liveUserInfo };
        if (id in currentData.liveUserInfo) {
          liveUserInfo[id] = {
            position: position,
            timestamp: timestamp,
          };
          // liveUserInfo[timestamp] = timestamp;
        } else {
          liveUserInfo[id] = {
            position: minHourSelectedDate,
            timestamp: timestamp,
          };
        }

        return liveUsersRef.update({
          liveUserInfo: liveUserInfo,
        });
      } else {
        console.log('user id not exist');
        return Promise.resolve(); // Resolve the promise without updating if userId exists or not provided
      }
    })
    .then(() => {
      // Successfully updated or added user position
      console.log('Position updated successfully');
    })
    .catch((error) => {
      console.error('Error updating position:', error);
    });
};

//  LiveInfo(useEffect)  ====> return newDAta.liveUserInfo => calcul => return {id:position:timeStamp}

// liveStamp
// userIds

export const getLiveUserInfoInRealtime = (
  setProof,
  setLiveIds,
  setLatestTimeStamp,
  selectedDate,
) => {
  const liveUsersRef = firebase.app().database().ref('liveUsers');
  let newData;
  liveUsersRef.on('value', (snapshot) => {
    newData = snapshot.val();
    let liveInfo = getLastUserPosition(newData.liveUserInfo, selectedDate);
    setProof(liveInfo);
    let userIds = getLiveUsers(newData.userIds);
    setLiveIds([...userIds]);
    setLatestTimeStamp(newData.liveUserTimestamp);
  });
};

export const getLastUserPosition = (liveUserInfo: any, selectedDate) => {
  // TODO: update the name to lastActiveUserPosition
  let max = -1;
  // const minHourSelectedDate =
  // new Date(selectedDate).setHours(0, 0, 0, 0) / 1000;
  let res = { id: '', position: 0, timestamp: 0 };
  for (const item in liveUserInfo) {
    let temp = liveUserInfo[item].timestamp;
    if (temp > max) {
      max = temp;
      res['id'] = item;
      res['position'] = liveUserInfo[item].position;
      res['timestamp'] = liveUserInfo[item].timestamp;
    }
  }
  // bt39 --> scroll value
  // lastUser
  // userId , postion, timeStamp
  // lastUser -> details + position
  return res;
};

export const getTimeStampFromId = (id) => {
  const liveUsersRef = firebase.app().database().ref('liveUsers');
  return liveUsersRef
    .child('liveUserInfo')
    .once('value')
    .then((snapshot) => {
      const liveUserInfo = snapshot.val();
      let temp;
      for (const item in liveUserInfo) {
        if (item === id) {
          temp = liveUserInfo[id].timestamp;
        }
      }
      return temp;
    });
};

export const postIdsWithTimeStamp = (userId: string, prevLiveUserId: []) => {
  const liveUsersRef = firebase.app().database().ref('liveUsers');

  liveUsersRef
    .once('value')
    .then((snapshot) => {
      const currentData = snapshot.val();
      const timestamp = Date.now();
      if (!currentData || !currentData.liveUserTimestamp) {
        return liveUsersRef.set({
          liveUserTimestamp: {
            [userId]: { timestamp },
          },
          userIds: { ...prevLiveUserId },
          ...currentData,
        });
      } else if (currentData.liveUserTimestamp) {
        let liveUserTimestamp = currentData &&
          currentData.liveUserTimestamp && { ...currentData.liveUserTimestamp };
        // Initialize as an empty object if not present
        if (userId in currentData.liveUserTimestamp) {
          liveUserTimestamp[userId] = {
            timestamp: timestamp,
          };
        } else {
          liveUserTimestamp[userId] = {
            timestamp: timestamp,
          };
        }

        return liveUsersRef.update({
          liveUserTimestamp: liveUserTimestamp,
        });
      } else {
        console.log('user id not exist');
        return Promise.resolve(); // Resolve the promise without updating if userId exists or not provided
      }
    })
    .then(() => {
      // Successfully updated or added user position
      console.log('TimeStamp updated successfully');
    })
    .catch((error) => {
      console.error('Error updating Timestamp:', error);
    });
};

export const getLastLoggedInTime = (
  id: string,
  liveUserTimestamp: { id: string },
) => {
  console.log('🚀 ~ .then ~ liveUserTimestamp:', liveUserTimestamp);
  let temp;
  for (const item in liveUserTimestamp) {
    if (item === id) {
      temp = liveUserTimestamp[id].timestamp;
    }
  }
  console.log('🚀 ~ .then ~ temp:', temp);

  return temp;
};
