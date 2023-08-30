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
  return (
    <View style={{ marginBottom: 10, padding: 5 }}>
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
                        Title: {item.task.title}
                      </Text>
                      <Text style={{ color: 'black', padding: 10 }}>
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
                              padding: 10,
                            }}
                          >
                            Estimated completion:{' '}
                            {item.task.startedOn - item.task.endsOn}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 13,
                              padding: 10,
                            }}
                          >
                            Estimated completion:{' '}
                            {item.task.startedOn - item.task.endsOn}
                          </Text>
                        )}
                      </>
                      <>
                        {item.task.featureUrl ? (
                          <Text style={{ color: 'grey' }}>
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
                            PR Title: {item.prList[0].title}
                          </Text>
                          <Text style={{ color: 'black', padding: 5 }}>
                            Completed in
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              borderBottomColor: 'grey',
                              borderBottomWidth: 1,
                              padding: 5,
                            }}
                          >
                            Feature live on
                          </Text>
                          <>
                            {item.prList[0].url ? (
                              <Text style={{ color: 'grey' }}>
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
    // margin: 10,
    fontStyle: 'Roboto',
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
  },
  DropDownbackground: {
    padding: 10,
    // height: 'auto',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default AllContributionsDropdown;
