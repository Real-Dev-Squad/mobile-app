import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Linking,
  Image,
} from 'react-native';
import { fetchContribution } from '../../../AuthScreen/Util';
import { useFocusEffect } from '@react-navigation/native';

const AllContributionsDropdown = () => {
  const [clicked, setClicked] = useState(false);
  const [allContributionsData, setAllContributionData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = 'ankush';
        const contributionResponse = await fetchContribution(userName);
        setAllContributionData(contributionResponse.all);
      })();
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
    const formatDate = (date) => {
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

      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      return `${day} ${months[monthIndex]}, ${year}`;
    };
    const formattedDate = formatDate(date);
    return formattedDate;
  };

  const parseISODate = (isoDateString) => {
    return new Date(isoDateString);
  };

  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={styles.DropDownButton}
      >
        <Text style={styles.DropDownTitle}>All Contributions</Text>
        {clicked ? (
          // <Text style={{ color: 'black', fontSize: 50, paddingLeft: 20 }}>
          //   -
          // </Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../../../../../assets/down.png')}
          />
        ) : (
          // <Text style={{ color: 'black', fontSize: 50, paddingLeft: 20 }}>
          //   +
          // </Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../../../../../assets/right.png')}
          />
        )}
      </TouchableOpacity>
      {clicked
        ? allContributionsData.map((item, index) => (
            <View key={index}>
              <View style={styles.DropDownElement}>
                <TouchableOpacity
                  style={styles.DropDownbackground}
                  onPress={
                    item.task.featureUrl
                      ? () => Linking.openURL(item.task.featureUrl)
                      : null
                  }
                >
                  {item.task.id ? (
                    <React.Fragment>
                      <Text style={{ color: 'blue', fontSize: 18 }}>
                        {item.task.title}
                      </Text>
                      <Text style={{ color: 'grey', marginTop: 5 }}>
                        {item.task.purpose}
                      </Text>
                      <>
                        {item.task.featureUrl ? (
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 13,
                              borderBottomColor: 'grey',
                              borderBottomWidth: 1,
                              marginTop: 5,
                            }}
                          >
                            Estimated completion:{' '}
                            {calculateTimeDifference(
                              convertTimestampToReadableDate(
                                item.task.startedOn,
                              ),
                              convertTimestampToReadableDate(item.task.endsOn),
                            )}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 13,
                              marginTop: 5,
                            }}
                          >
                            Estimated completion:{' '}
                            {calculateTimeDifference(
                              convertTimestampToReadableDate(
                                item.task.startedOn,
                              ),
                              convertTimestampToReadableDate(item.task.endsOn),
                            )}
                          </Text>
                        )}
                      </>
                      <>
                        {item.task.featureUrl ? (
                          <Text style={{ color: 'grey', textAlign: 'center' }}>
                            Checkout this feature in action
                          </Text>
                        ) : null}
                      </>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {item.prList.length > 0 && (
                        <React.Fragment>
                          <Text style={{ color: 'blue', fontSize: 18 }}>
                            {item.prList[0].title}
                          </Text>
                          <Text style={{ color: 'black', marginTop: 5 }}>
                            Completed in:{' '}
                            {calculateTimeDifference(
                              parseISODate(item.prList[0].createdAt),
                              parseISODate(item.prList[0].updatedAt),
                            )}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              borderBottomColor: 'grey',
                              borderBottomWidth: 1,
                              marginTop: 5,
                            }}
                          >
                            Feature live on:{' '}
                            {calculateISODateFormat(item.prList[0].updatedAt)}
                          </Text>
                          <>
                            {item.prList[0].url ? (
                              <Text
                                style={{ color: 'grey', textAlign: 'center' }}
                              >
                                Checkout this feature in action
                              </Text>
                            ) : null}
                          </>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </TouchableOpacity>
                <Text>{item.prList.title}</Text>
              </View>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    width: '100%',
    height: 100,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 35,
    // paddingRight: 25,
  },
  DropDownTitle: {
    fontWeight: '600',
    fontSize: 30,
    color: 'black',
  },
  DropDownElement: {
    color: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
  },
  DropDownbackground: {
    padding: 10,
    marginTop: 5,
    height: 'auto',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default AllContributionsDropdown;
