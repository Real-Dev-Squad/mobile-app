import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import {
  calculateISODateFormat,
  calculateTimeDifference,
  convertTimestampToReadableDate,
  parseISODate,
} from '../screens/AuthScreen/Util';
import { profileScreenStyles } from '../screens/ProfileScreen/styles';

const DisplayContribution = ({ tasks }) => {
  return (
    <View style={{ padding: 5 }}>
      {tasks.length !== 0 ? (
        tasks.map((item, index) => (
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
        ))
      ) : (
        <Text>No Tasks Yet!</Text>
      )}
    </View>
  );
};

export default DisplayContribution;
