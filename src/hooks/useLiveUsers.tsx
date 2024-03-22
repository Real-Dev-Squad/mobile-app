import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserInfoType } from '../context/type';
import { getLiveUserInfoInRealtime } from '../utils/Api';

export const useLiveUsers = () => {
  const [liveUsers, setLiveUsers] = useState<UserInfoType[]>([]);
  const [liveIds, setLiveIds] = useState<Dispatch<SetStateAction<() => {}>>[]>(
    [],
  );

  useEffect(() => {
    getLiveUserInfoInRealtime(setLiveIds);
  }, []);
};
