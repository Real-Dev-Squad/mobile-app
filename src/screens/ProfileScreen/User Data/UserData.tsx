import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

const UserData = ({ userData }) => {
  return (
    <View>
      <Text style={styles.Name}>{userData.name}</Text>
      <Text style={styles.userName}>{'@' + userData.username}</Text>
      <Text style={styles.designation}> {userData.designation}</Text>
      <Text style={styles.company}> {userData.company}</Text>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <>
          <TouchableOpacity
            onPress={() => Linking.openURL(userData.twitter_id)}
          >
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/twitter_logo.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(userData.linkedin_id)}
          >
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/linkedIn_logo.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://github.com/${userData.github_id}`)
            }
          >
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/githublogo.png')}
            />
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  userName: {
    fontSize: 13,
    textAlign: 'center',
    color: 'grey',
  },
  designation: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  company: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
});

export default UserData;
