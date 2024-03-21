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
