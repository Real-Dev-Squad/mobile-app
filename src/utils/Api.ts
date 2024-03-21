import { UserInfoType } from '../context/type';
import { eventsCollection } from '../helpers/CalendarInviteHelpers';
import { getAllUsers } from '../screens/AuthScreen/Util';

export const fetchUsers = async (
  token: string,
  setUsers: (allUser: UserInfoType[]) => void,
) => {
  const allUser = await getAllUsers(token);
  setUsers(allUser);
};

export const postEvent = async (eventData) => {
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
