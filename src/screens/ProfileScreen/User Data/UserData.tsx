import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import GithubSvg from '../../../../assets/svgs/github_logo';
import LinkedInSvg from '../../../../assets/svgs/linkedIn';
import TwitterSvg from '../../../../assets/svgs/twitter';
import { styles } from './UserDataStyle';

const UserData = ({ userData }) => {
  const {
    twitter_id,
    linkedin_id,
    github_id,
    designation,
    company,
    name,
    username,
  } = userData;
  return (
    <View>
      <Text style={styles.Name}>{name}</Text>
      {github_id && <Text style={styles.userName}>{'@' + username}</Text>}
      {designation && <Text style={styles.designation}> {designation}</Text>}
      {company && <Text style={styles.company}> {company}</Text>}
      <View style={styles.contactView}>
        {twitter_id && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://twitter.com/${twitter_id}`)}
          >
            <TwitterSvg height={30} width={30} />
          </TouchableOpacity>
        )}
        {linkedin_id && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://www.linkedin.com/in/${linkedin_id}`)
            }
          >
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

export default UserData;
