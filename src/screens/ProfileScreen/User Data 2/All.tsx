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

  const calculateISODateFormat = (isoDateString) => {
    const date = new Date(isoDateString);
    const formatDate = (d) => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const day = d.getDate();
      const monthIndex = d.getMonth();
      const year = d.getFullYear();

      return `${day} ${months[monthIndex]}, ${year}`;
    };
    const formattedDate = formatDate(date);
    return formattedDate;
  };

  const parseISODate = (isoDateString) => {
    return new Date(isoDateString);
  };

  return (
    <ScrollView style={{ padding: 10, elevation: 10 }}>
      <View style={profileScreenStyles.container}>
        {allContributionsData.map((item, index) => (
          <View style={profileScreenStyles.DropDownElement} key={index}>
            <TouchableOpacity
              style={profileScreenStyles.DropDownbackground}
              onPress={
                item.task.featureUrl
                  ? () => Linking.openURL(item.task.featureUrl)
                  : null
              }
            >
              {item.task.id ? (
                <React.Fragment>
                  <Text
                    style={{
                      color: 'blue',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
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
                  <>
                    {item.task.featureUrl ? (
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          borderBottomColor: 'grey',
                          // borderBottomWidth: 1,
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingBottom: 10,
                        }}
                      >
                        Estimated completion:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {calculateTimeDifference(
                            convertTimestampToReadableDate(item.task.startedOn),
                            convertTimestampToReadableDate(item.task.endsOn),
                          )}
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingBottom: 10,
                        }}
                      >
                        Estimated completion:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {calculateTimeDifference(
                            convertTimestampToReadableDate(item.task.startedOn),
                            convertTimestampToReadableDate(item.task.endsOn),
                          )}
                        </Text>
                      </Text>
                    )}
                  </>
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
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {item.prList.length > 0 && (
                    <React.Fragment>
                      <Text
                        style={{
                          color: 'blue',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        PR Title: {item.prList[0].title}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingBottom: 10,
                          paddingTop: 10,
                        }}
                      >
                        Completed in:{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {calculateTimeDifference(
                            parseISODate(item.prList[0].createdAt),
                            parseISODate(item.prList[0].updatedAt),
                          )}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          borderBottomColor: 'grey',
                          // borderBottomWidth: 1,
                          fontSize: 15,
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingBottom: 10,
                        }}
                      >
                        Feature live on:{' '}
                        {calculateISODateFormat(item.prList[0].updatedAt)}
                      </Text>
                      <>
                        {item.prList[0].url ? (
                          <Text style={{ color: 'grey', textAlign: 'center' }}>
                            Checkout this feature in action
                          </Text>
                        ) : null}
                      </>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default All;
