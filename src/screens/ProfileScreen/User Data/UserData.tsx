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
  const { twitter_id, linkedin_id, github_id, designation, company } = userData;
  return (
    <View>
      <Text style={styles.Name}>Yash Raj</Text>
      {github_id && <Text style={styles.userName}>{'@' + github_id}</Text>}
      {designation && <Text style={styles.designation}> {designation}</Text>}
      {company && <Text style={styles.company}> {company}</Text>}
      <View style={styles.contactView}>
        {twitter_id && (
          <TouchableOpacity onPress={() => Linking.openURL(twitter_id)}>
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/twitter_logo.png')}
            />
          </TouchableOpacity>
        )}
        {linkedin_id && (
          <TouchableOpacity onPress={() => Linking.openURL(linkedin_id)}>
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/linkedIn_logo.png')}
            />
          </TouchableOpacity>
        )}
        {github_id && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://github.com/${github_id}`)}
          >
            <Image
              style={{ height: 30, width: 30, margin: 5 }}
              source={require('../../../../assets/githublogo.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
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
  contactView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default UserData;
