import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    const formatDate = (dateVar) => {
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

      const day = dateVar.getDate();
      const monthIndex = dateVar.getMonth();
      const year = dateVar.getFullYear();

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
          <Image
            style={styles.ImageDimensions}
            source={require('../../../../../assets/down.png')}
          />
        ) : (
          <Image
            style={styles.ImageDimensions}
            source={require('../../../../../assets/right.png')}
          />
        )}
      </TouchableOpacity>
      {clicked
        ? allContributionsData.map((item, index) => (
            <View key={index}>
              <View style={styles.DropDownElement}>
                {item.task.id ? (
                  <TouchableOpacity
                    style={styles.DropDownbackground}
                    onPress={
                      item.task.featureUrl
                        ? () => Linking.openURL(item.task.featureUrl)
                        : null
                    }
                  >
                    <React.Fragment>
                      <Text style={styles.ItemTaskTitle}>
                        {item.task.title}
                      </Text>
                      <Text style={styles.ItemTaskPurpose}>
                        {item.task.purpose}
                      </Text>
                      <>
                        {item.task.featureUrl ? (
                          <Text style={styles.EstimatedTimeChoice1}>
                            Estimated completion:{' '}
                            {calculateTimeDifference(
                              convertTimestampToReadableDate(
                                item.task.startedOn,
                              ),
                              convertTimestampToReadableDate(item.task.endsOn),
                            )}
                          </Text>
                        ) : (
                          <Text style={styles.EstimatedTimeChoice2}>
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
                          <Text style={styles.CheckoutLive}>
                            Checkout this feature in action
                          </Text>
                        ) : null}
                      </>
                    </React.Fragment>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.DropDownbackground}
                    onPress={
                      item.prList[0].url
                        ? () => Linking.openURL(item.prList[0].url)
                        : null
                    }
                  >
                    <React.Fragment>
                      {item.prList.length > 0 && (
                        <React.Fragment>
                          <Text style={styles.ItemTaskTitle}>
                            {item.prList[0].title}
                          </Text>
                          <Text style={styles.CompletedIn}>
                            Completed in:{' '}
                            {calculateTimeDifference(
                              parseISODate(item.prList[0].createdAt),
                              parseISODate(item.prList[0].updatedAt),
                            )}
                          </Text>
                          <Text style={styles.FeatureDate}>
                            Feature live on:{' '}
                            {calculateISODateFormat(item.prList[0].updatedAt)}
                          </Text>
                          <>
                            {item.prList[0].url ? (
                              <Text style={styles.CheckoutLive}>
                                Checkout this feature in action
                              </Text>
                            ) : null}
                          </>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  </TouchableOpacity>
                )}
                {/* </TouchableOpacity> */}
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
    height: 80,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 35,
  },
  DropDownTitle: {
    fontWeight: '600',
    fontSize: 20,
    flex:1,
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
  ImageDimensions: {
    height: 100,
    width: 100,
  },
  EstimatedTimeChoice1: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  EstimatedTimeChoice2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
  },
  FeatureDate: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  CheckoutLive: {
    color: 'grey',
    textAlign: 'center',
  },
  ItemTaskTitle: {
    color: 'blue',
    fontSize: 18,
  },
  ItemTaskPurpose: {
    color: 'black',
    marginTop: 5,
  },
  CompletedIn: {
    color: 'grey',
    marginTop: 5,
  },
});

export default AllContributionsDropdown;
