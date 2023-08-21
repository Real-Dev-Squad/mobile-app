import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import { fetchContribution } from '../../../AuthScreen/Util';
import { useFocusEffect } from '@react-navigation/native';

const NoteworthyContributionsDropdown = () => {
  const [clicked, setClicked] = useState(false);
  const [userContributionData, setUserContributionData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = 'ankush';
        const contributionResponse = await fetchContribution(userName);
        setUserContributionData(contributionResponse.noteworthy);
      })();
    }, []),
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={styles.DropDownButton}
      >
        <Text style={styles.DropDownTitle}>Noteworthy Contributions</Text>
      </TouchableOpacity>
      {clicked
        ? userContributionData.map((item, index) => (
            <View style={styles.DropDownElement} key={index}>
              <TouchableOpacity
                style={styles.DropDownbackground}
                onPress={
                  item.task.featureUrl
                    ? () => Linking.openURL(item.task.featureUrl)
                    : null
                }
              >
                <Text style={{ color: 'blue', fontSize: 18 }}>
                  {item.task.title}
                </Text>
                <>
                  {item.task.purpose ? (
                    <Text style={{ color: 'black', padding: 10 }}>
                      {item.task.purpose}
                    </Text>
                  ) : null}
                </>
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
                      Estimated completion: {item.task.endsOn}
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
                    <Text
                      style={{
                        color: 'grey',
                        textAlign: 'center',
                      }}
                    >
                      Checkout this feature in action
                    </Text>
                  ) : null}
                </>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    width: 400,
    height: 50,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  DropDownTitle: {
    fontWeight: '600',
    color: 'black',
  },
  DropDownElement: {
    color: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    // borderBottomWidth: 0.5,
  },
  DropDownbackground: {
    padding: 10,
    marginTop: 10,
    height: 'auto',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default NoteworthyContributionsDropdown;
