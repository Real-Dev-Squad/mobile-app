import React, { useState, useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import Loader from '../../../components/Loader';
import { fetchActiveTasks } from '../../AuthScreen/Util';

const ActiveScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTasks, setActiveTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      (async () => {
        const token = loggedInUserData?.token;

        const tasksRes = await fetchActiveTasks(token);
        const activeTaskRes = tasksRes.filter(
          (item) => item.status !== 'COMPLETED',
        );
        setActiveTasks(activeTaskRes);
        setLoading(false);
      })();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserData?.token]),
  );
  return (
    <View style={styles.profile}>
      {loading ? (
        <Loader />
      ) : (
        <DisplayContribution tasks={activeTasks} isActive={true} />
      )}
    </View>
  );
};

export default ActiveScreen;

const styles = StyleSheet.create({
  profile: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
