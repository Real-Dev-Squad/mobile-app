import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import GithubSvg from '../../../../assets/svgs/github_logo';
import LinkedInSvg from '../../../../assets/svgs/linkedIn';
import TwitterSvg from '../../../../assets/svgs/twitter';

const UserData = ({ userData }) => {
  const { twitter_id, linkedin_id, github_id, designation, company, name } =
    userData;
  return (
    <View>
      <Text style={styles.Name}>{name}</Text>
      {github_id && <Text style={styles.userName}>{'@' + github_id}</Text>}
      {designation && <Text style={styles.designation}> {designation}</Text>}
      {company && <Text style={styles.company}> {company}</Text>}
      <View style={styles.contactView}>
        {twitter_id && (
          <TouchableOpacity onPress={() => Linking.openURL(twitter_id)}>
            <TwitterSvg height={30} width={30} />
          </TouchableOpacity>
        )}
        {linkedin_id && (
          <TouchableOpacity onPress={() => Linking.openURL(linkedin_id)}>
            <LinkedInSvg height={30} width={30} />
          </TouchableOpacity>
        )}
        {github_id && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://github.com/${github_id}`)}
          >
            <GithubSvg height={28} width={28} />
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
