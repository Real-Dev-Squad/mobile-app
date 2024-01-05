import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import { fetchAllTasks } from '../../AuthScreen/Util';
import Loader from '../../../components/Loader';
import AllTaskDetailScreen from '../DetailsScreen/AllTaskDetailScreen';
import { useSelector } from 'react-redux';

const All = () => {
  const [allTask, setAllTask] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      (async () => {
        const token = loggedInUserData?.token;

        const allTasks = await fetchAllTasks(token);
        const idToMatch = loggedInUserData.id;
        const myActiveTask = allTasks.tasks.filter(
          (task) => task.assigneeId === idToMatch,
        );

        setAllTask(myActiveTask);
        setLoading(false);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.profile}>
      {loading ? (
        <Loader />
      ) : (
        <DisplayContribution tasks={allTask} expand={false} />
      )}
    </View>
    <ScrollView style={{ padding: 10, elevation: 10 }}>
      {isProdEnvironment ? (
        <AllTaskDetailScreen />
      ) : (
        <DisplayContribution tasks={allContributionsData} />
      )}
  );
};
const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default All;
