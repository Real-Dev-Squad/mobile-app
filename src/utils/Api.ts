import { UserInfoType } from '../context/type';
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
  // return eventsCollection
  //   .add(eventData)
  //   .then((docRef) => {
  //     return Promise.resolve();
  //   })
  //   .catch((error) => {
  //     return Promise.reject();
  //   });
};
