import React, { useCallback, useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { fetchContribution } from '../../AuthScreen/Util';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';

const All = () => {
  const [allContributionsData, setAllContributionData] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = loggedInUserData?.username;
        const contributionResponse = await fetchContribution(userName);
        setAllContributionData(contributionResponse.all);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <ScrollView style={{ padding: 10, elevation: 10 }}>
      <DisplayContribution tasks={allContributionsData} />
    </ScrollView>
  );
};

export default All;
