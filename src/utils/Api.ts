import { EventDataType, UserInfoType } from '../context/type';
import { eventsCollection } from '../helpers/CalendarInviteHelpers';
import { getAllUsers } from '../screens/AuthScreen/Util';

export const fetchUsers = async (
  token: string,
  setUsers: (allUser: UserInfoType[]) => void,
) => {
  const allUser = await getAllUsers(token);
  setUsers(allUser);
};

export const postEvent = async (eventData: EventDataType) => {
  console.log('🚀 ~ postEvent ~ eventData:', eventData);
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
