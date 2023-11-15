import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { fetchContribution } from '../../AuthScreen/Util';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const ActiveScreen = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = loggedInUserData?.username;
        const contributionResponse = await fetchContribution(userName);
        setActiveTasks(
          contributionResponse.all.filter(
            (item: { task: { status: string } }) =>
              item.task.status === 'ACTIVE',
          ),
        );
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <View style={styles.profile}>
      <DisplayContribution tasks={activeTasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ActiveScreen;
