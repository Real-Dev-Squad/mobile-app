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
  let twitterIcon = 'twitterUrl' in userData;
  console.log(twitterIcon);
  return (
    <View>
      <Text style={styles.Name}>{userData.name}</Text>
      <Text style={styles.userName}>{'@' + userData.userName}</Text>
      <Text style={styles.designation}> {userData.designation}</Text>
      <Text style={styles.company}> {userData.company}</Text>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        {twitterIcon ? (
          <>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://twitter.com/_bhaaratii')}
            >
              <Image
                style={{ height: 30, width: 30, margin: 5 }}
                source={require('../../../../assets/twitter_logo.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/in/bharati-subramanian-29734b152/',
                )
              }
            >
              <Image
                style={{ height: 30, width: 30, margin: 5 }}
                source={require('../../../../assets/linkedIn_logo.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://github.com/bharati-21')}
            >
              <Image
                style={{ height: 30, width: 30, margin: 5 }}
                source={require('../../../../assets/github_logo.png')}
              />
            </TouchableOpacity>
          </>
        ) : null}
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
