import React, { useCallback, useContext, useState } from 'react';
import { ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import AllTaskDetailScreen from '../DetailsScreen/AllTaskDetailScreen';
import { useSelector } from 'react-redux';

const All = () => {
  const [allContributionsData, setAllContributionData] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);

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
      {isProdEnvironment ? (
        <AllTaskDetailScreen />
      ) : (
        <DisplayContribution tasks={allContributionsData} />
      )}
    </ScrollView>
  );
};

export default All;
