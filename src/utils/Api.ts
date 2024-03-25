import { UserInfoType } from '../context/type';
import { getAllUsers } from '../screens/AuthScreen/Util';

export const fetchUsers = async (
  token: string,
  setUsers: (allUser: UserInfoType[]) => void,
) => {
  const allUser = await getAllUsers(token);
  setUsers(allUser);
};
