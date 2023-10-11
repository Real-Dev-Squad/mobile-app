/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { profileScreenStyles } from '../styles';
import { fetchContribution } from '../../AuthScreen/Util';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';

const Note = () => {
  const [userContributionData, setUserContributionData] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = loggedInUserData?.username;
        const contributionResponse = await fetchContribution(userName);
        setUserContributionData(contributionResponse.noteworthy);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const convertTimestampToReadableDate = (timestamp) => {
    return new Date(timestamp * 1000);
  };
  const calculateTimeDifference = (startDate, endDate) => {
    const timeDifference = endDate - startDate;
    const secondsInMillisecond = 1000;
    const minutesInMillisecond = 60 * secondsInMillisecond;
    const hoursInMillisecond = 60 * minutesInMillisecond;
    const daysInMillisecond = 24 * hoursInMillisecond;
    const weeksInMillisecond = 7 * daysInMillisecond;
    const monthsInMillisecond = 30.44 * daysInMillisecond; // Average month length
    const yearsInMillisecond = 365 * daysInMillisecond;

    if (timeDifference < minutesInMillisecond) {
      return `${Math.floor(timeDifference / secondsInMillisecond)} seconds`;
    } else if (timeDifference < hoursInMillisecond) {
      return `${Math.floor(timeDifference / minutesInMillisecond)} minutes`;
    } else if (timeDifference < daysInMillisecond) {
      return `${Math.floor(timeDifference / hoursInMillisecond)} hours`;
    } else if (timeDifference < weeksInMillisecond) {
      return `${Math.floor(timeDifference / daysInMillisecond)} days`;
    } else if (timeDifference < monthsInMillisecond) {
      return `${Math.floor(timeDifference / weeksInMillisecond)} weeks`;
    } else if (timeDifference < yearsInMillisecond) {
      return `${Math.floor(timeDifference / monthsInMillisecond)} months`;
    } else {
      return `${Math.floor(timeDifference / yearsInMillisecond)} years`;
    }
  };

  return (
    <ScrollView style={{ padding: 10, elevation: 10 }}>
      {userContributionData.task ? (
        <View style={profileScreenStyles.container}>
          {userContributionData.map((item, index) => (
            <View style={profileScreenStyles.DropDownElement} key={index}>
              <TouchableOpacity
                style={profileScreenStyles.DropDownbackground}
                onPress={
                  item.task.featureUrl
                    ? () => Linking.openURL(item.task.featureUrl)
                    : null
                }
              >
                <Text
                  style={{ color: 'blue', fontSize: 18, fontWeight: 'bold' }}
                >
                  {item.task.title}
                </Text>
                <>
                  {item.task.purpose ? (
                    <Text
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        color: 'grey',
                        fontSize: 15,
                      }}
                    >
                      {item.task.purpose}
                    </Text>
                  ) : (
                    <View style={{ padding: 10 }} />
                  )}
                </>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 10,
                  }}
                >
                  Estimated completion:{''}
                  <Text style={{ fontWeight: 'bold' }}>
                    {calculateTimeDifference(
                      convertTimestampToReadableDate(item.task.startedOn),
                      convertTimestampToReadableDate(item.task.endsOn),
                    )}
                  </Text>
                </Text>
                <>
                  {item.task.featureUrl ? (
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: 13,
                        textAlign: 'center',
                      }}
                    >
                      Checkout this feature in action
                    </Text>
                  ) : null}
                </>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 13, color: 'black' }}>
            No noteworthy task yet!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Note;
