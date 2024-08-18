import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import { fetchAllTasks } from '../../AuthScreen/Util';
import Loader from '../../../components/Loader';

const All = () => {
  const [allTask, setAllTask] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      (async () => {
        const token = loggedInUserData?.token;

        const allTasks = await fetchAllTasks(token);
        setAllTask(allTasks);
        setLoading(false);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DisplayContribution tasks={allTask} isActive={false} />
      )}
    </>
    //TODO: to call AllTaskDetailScreen
    // <ScrollView style={{ padding: 10, elevation: 10 }}>
    //   {isProdEnvironment ? (
    //     <AllTaskDetailScreen />
    //   ) : (
    //     <DisplayContribution tasks={allContributionsData} />
    //   )}
    //   </ScrollView>
  );
};
export default All;
