import { EventDataType, UserInfoType } from '../context/type';
import { eventsCollection } from '../helpers/CalendarInviteHelpers';
import { getAllUsers } from '../screens/AuthScreen/Util';
import { firebase } from '@react-native-firebase/database';

export const fetchUsers = async (
  token: string,
  setUsers: (allUser: UserInfoType[]) => void,
) => {
  const allUser = await getAllUsers(token);
  setUsers(allUser);
};

export const postEvent = async (eventData: EventDataType) => {
  return eventsCollection
    .add(eventData)
    .then(() => {
      return Promise.resolve();
    })
    .catch(() => {
      return Promise.reject();
    });
};

export const fetchEvents = async () => {
  let eventSnapshot = await eventsCollection.get();

  const events: EventDataType[] = [];

  eventSnapshot.forEach((event: any) => {
    events.push({
      id: event.id,
      ...event.data(),
    });
  });
  return events;
};

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

export const getProgressVal = async (updateValue: (value: number) => void) => {
  return firebase
    .app()
    .database()
    .ref('progressVal')
    .on('value', (snapshot) => {
      const newProgressVal = snapshot.val()?.progressVal || 20;
      updateValue(newProgressVal);
    });
};

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

export const getLastUserPosition = (liveUserInfo: any) => {
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
  return res;
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

export const postIdsWithTimeStamp = (userId: string) => {
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
